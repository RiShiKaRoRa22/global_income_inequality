import pandas as pd
import numpy as np


def clean_worldbank_data(file_path, value_name):
    df = pd.read_csv(file_path, skiprows=4)

    df = df[['Country Name', 'Country Code'] +
            [col for col in df.columns if col.isdigit()]]

    df_long = df.melt(
        id_vars=['Country Name', 'Country Code'],
        var_name='Year',
        value_name=value_name
    )

    df_long['Year'] = df_long['Year'].astype(int)

    return df_long


def merge_all():
    gini = clean_worldbank_data("data/raw/API_SI.POV.GINI_DS2_en_csv_v2_35.csv", "Gini")
    gdp = clean_worldbank_data("data/raw/API_NY.GDP.PCAP.CD_DS2_en_csv_v2_31.csv", "GDP_per_capita")
    low20 = clean_worldbank_data("data/raw/API_SI.DST.FRST.20_DS2_en_csv_v2_6298.csv", "Lowest20_share")
    high10 = clean_worldbank_data("data/raw/API_SI.DST.10TH.10_DS2_en_csv_v2_6265.csv", "Highest10_share")

    df = gini.merge(gdp, on=["Country Name", "Country Code", "Year"], how="outer")
    df = df.merge(low20, on=["Country Name", "Country Code", "Year"], how="outer")
    df = df.merge(high10, on=["Country Name", "Country Code", "Year"], how="outer")

    df = df.sort_values(["Country Name", "Year"])

    # Drop rows without Gini
    df = df.dropna(subset=["Gini"])

    # Forward fill
    df[["GDP_per_capita", "Lowest20_share", "Highest10_share"]] = \
        df.groupby("Country Name")[["GDP_per_capita",
                                    "Lowest20_share",
                                    "Highest10_share"]].ffill()

    # Feature Engineering
    df["Inequality_Ratio"] = df["Highest10_share"] / \
        df["Lowest20_share"].replace(0, np.nan)

    df["Log_GDP"] = np.log(df["GDP_per_capita"].replace(0, np.nan)) #non linear derived feature to plot

    # Filter years
    #df = df[df["Year"] >= 2000] , not require since we will also look at historical data

    return df
import pandas as pd
import glob
import pycountry

# -------- SETTINGS --------
START_YEAR = 1965

# Percentiles we want
PERCENTILES = ["p99p100", "p90p100", "p0p50", "p0p10"]

# -------- STEP 1: Load All WID Country Files --------
files = glob.glob("../data/raw/wid_all_data/WID_data_*.csv")

all_data = []

for file in files:
    df = pd.read_csv(file, sep=";")

    # Keep only income share variables (sptinc)
    df = df[
        (df["variable"].str.startswith("sptinc")) &
        (df["percentile"].isin(PERCENTILES)) &
        (df["year"] >= START_YEAR)
    ]

    all_data.append(df)

print(f"Loaded {len(all_data)} country files")


wid_all = pd.concat(all_data, ignore_index=True)


wid_pivot = wid_all.pivot_table(
    index=["country", "year"],
    columns="percentile",
    values="value"
).reset_index()


wid_pivot = wid_pivot.rename(columns={
    "country": "ISO2",
    "year": "Year",
    "p99p100": "Top1_income_share",
    "p90p100": "Top10_income_share",
    "p0p50": "Bottom50_income_share",
    "p0p10": "Bottom10_income_share"
})

# -------- STEP 5: Convert ISO2 → ISO3 --------
def iso2_to_iso3(code):
    try:
        return pycountry.countries.get(alpha_2=code).alpha_3
    except:
        return None

wid_pivot["Country Code"] = wid_pivot["ISO2"].apply(iso2_to_iso3)

# Remove rows where conversion failed
wid_pivot = wid_pivot.dropna(subset=["Country Code"])

# -------- STEP 6: Final Clean --------
wid_pivot = wid_pivot.drop(columns=["ISO2"])

print("Final WID dataset shape:", wid_pivot.shape)


# Save file
wid_pivot.to_csv("wid_processed_all_countries.csv", index=False)

print("WID processing complete!")
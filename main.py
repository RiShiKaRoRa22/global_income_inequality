from src.preprocess import merge_all
import pandas as pd

df = merge_all()

df.to_csv("data/preprocessed/worldbank_master.csv", index=False)

print("Dataset created successfully!")

master = pd.read_csv("data/preprocessed/worldbank_master.csv")
wid = pd.read_csv("src/wid_processed_all_countries.csv")

final = master.merge(
    wid,
    on=["Country Code", "Year"],
    how="left"
)

final.to_csv("inequality_full_dataset.csv", index=False)




common = set(master["Country Code"]).intersection(set(wid["Country Code"]))
print(master[master["Country Code"] == "FRA"]["Year"])
print(wid[wid["Country Code"] == "FRA"]["Year"])
import pandas as pd

# -----------------------------
# STEP 1: Load datasets
# -----------------------------

master = pd.read_csv("../data/preprocessed/worldbank_master.csv")
wid = pd.read_csv("../src/wid_processed_all_countries.csv")

print("Master shape:", master.shape)
print("WID shape:", wid.shape)

# -----------------------------
# STEP 2: Fix data types
# -----------------------------

master["Year"] = master["Year"].astype(int)
wid["Year"] = wid["Year"].astype(int)

master["Country Code"] = master["Country Code"].str.strip()
wid["Country Code"] = wid["Country Code"].str.strip()

# -----------------------------
# STEP 3: Merge
# -----------------------------

final = master.merge(
    wid,
    on=["Country Code", "Year"],
    how="left",
    indicator=True
)

print(final["_merge"].value_counts())

# -----------------------------
# STEP 4: Keep only rows where WID exists
# -----------------------------

final_clean = final[final["Top1_income_share"].notna()].copy()

print("Final cleaned dataset shape:", final_clean.shape)
print("Countries:", final_clean["Country Code"].nunique())
cols = [
    "Top1_income_share",
    "Top10_income_share",
    "Bottom50_income_share",
    "Bottom10_income_share"
]

for col in cols:
    final_clean[col] = final_clean[col].replace(0, pd.NA)

final_clean = final_clean.dropna(
    subset=[
        "Top1_income_share",
        "Top10_income_share",
        "Bottom50_income_share"
    ]
)


# -----------------------------
# STEP 5: Save final dataset
# -----------------------------

final_clean.to_csv("../data/preprocessed/inequality_multisource_clean.csv", index=False)

print("Pipeline complete. File saved as inequality_multisource_clean.csv")
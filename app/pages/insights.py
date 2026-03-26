import streamlit as st
import pandas as pd

def show():
    st.title("📈 Key Insights")

    data = pd.DataFrame({
        "Country": ["India", "USA", "UK"],
        "Gini Index": [35, 41, 33]
    })

    st.bar_chart(data.set_index("Country"))

    st.markdown("""
    ### Observations:
    - USA shows higher inequality
    - Developing nations show moderate inequality
    - Policy impact visible in European countries
    """)
import streamlit as st
import pandas as pd

def show():
    st.title("🌍 Global Inequality Map")

    data = pd.DataFrame({
        "country": ["India", "USA", "Brazil"],
        "lat": [20.5937, 37.0902, -14.2350],
        "lon": [78.9629, -95.7129, -51.9253],
        "inequality": [35, 41, 53]
    })

    st.map(data)
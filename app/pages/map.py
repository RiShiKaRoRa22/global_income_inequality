import streamlit as st
import pandas as pd

def show():
    st.title("🌍 Inequality Map")

    data = pd.DataFrame({
        "lat": [20.5937, 51.5074],
        "lon": [78.9629, -0.1278]
    })

    st.map(data)
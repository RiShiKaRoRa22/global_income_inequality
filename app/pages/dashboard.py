import streamlit as st

def show():
    st.title("📊 Inequality Dashboard")

    st.write("Interactive Power BI dashboard:")

    powerbi_url = "PASTE_YOUR_IFRAME_LINK"

    st.components.v1.iframe(powerbi_url, height=700)
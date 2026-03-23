import streamlit as st

def show():
    st.title("📊 Global Inequality Dashboard")

    powerbi_url = "PASTE_YOUR_POWERBI_LINK_HERE"

    st.components.v1.iframe(powerbi_url, height=600)
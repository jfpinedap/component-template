import os
import streamlit as st
import streamlit.components.v1 as components
import time

_material_login = components.declare_component(
    "material_login", url="http://localhost:3001",
)

# parent_dir = os.path.dirname(os.path.abspath(__file__))
# build_dir = os.path.join(parent_dir, "frontend/build")
# _material_login = components.declare_component("material_login", path=build_dir)


def material_login(title, key=None):
    ranges = [
        {
        "value": 'none',
        "label": 'None',
        },
        {
        "value": '0-10',
        "label": '0 to 10',
        },
        {
        "value": '11-20',
        "label": '11 to 20',
        },
        {
        "value": '21-30',
        "label": '21 to 30',
        },
        {
        "value": '31-40',
        "label": '31 to 40',
        },
        {
        "value": '41-50',
        "label": '41 to 50',
        },
        {
        "value": '51-60',
        "label": '51 to 60',
        },
        {
        "value": '61-70',
        "label": '61 to 70',
        },
        {
        "value": '81-90',
        "label": '81 to 90',
        },
        {
        "value": '91-100',
        "label": '91 to 100',
        },
    ]
    return _material_login(
        title=title,
        in_ranges=ranges,
        in_checked=True,
        in_mult_selection=[
            selection["value"] for selection in  ranges[-2:]
        ],
        in_selection="91-100",
        in_number=0.0,
        key=key,
    )


USERNAME = "a@a.com"
PASSWORD = "test"

with st.sidebar:
    logged_in_data = material_login("Insert your account")
number = st.number_input("Enter a number")
text = st.text_input("Enter a text")

st.write(number, text)

time.sleep(8)
st.write(logged_in_data)

if bool(logged_in_data) and logged_in_data['username'] == USERNAME and logged_in_data['password'] == PASSWORD:
    st.balloons()

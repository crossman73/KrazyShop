import plotly.graph_objects as go

# Data from instructions with English labels
features = [
    "Brand Logo",
    "Product Name Text", 
    "Package Shape",
    "Primary Color",
    "Volume Info",
    "Product Category",
    "Unique Design"
]

# Accuracy contributions from the data
accuracy_values = [30, 25, 20, 10, 8, 5, 2]

# Create horizontal bar chart
fig = go.Figure(go.Bar(
    x=accuracy_values,
    y=features,
    orientation='h',
    marker_color=['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F', '#D2BA4C', '#B4413C', '#964325']
))

# Update layout
fig.update_layout(
    title="Feature Importance for Product Recognition",
    xaxis_title="Accuracy (%)",
    yaxis_title="Features"
)

# Update traces for better visibility
fig.update_traces(cliponaxis=False)

# Save as both PNG and SVG
fig.write_image("feature_importance.png")
fig.write_image("feature_importance.svg", format="svg")

print("Chart saved as feature_importance.png and feature_importance.svg")
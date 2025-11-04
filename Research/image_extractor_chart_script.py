import plotly.graph_objects as go
import plotly.express as px

# Since mermaid is having server issues, create a flowchart using plotly
fig = go.Figure()

# Define the flowchart nodes and their positions
nodes = [
    {"name": "Take Photo", "x": 2, "y": 10},
    {"name": "Extract Text", "x": 2, "y": 9},
    {"name": "Text Found?", "x": 2, "y": 8, "shape": "diamond"},
    {"name": "Retake", "x": 0.5, "y": 7},
    {"name": "Analyze Safety", "x": 2, "y": 7},
    {"name": "Harmful?", "x": 2, "y": 6, "shape": "diamond"},
    {"name": "Show Warning", "x": 0.5, "y": 5},
    {"name": "Show Safe", "x": 3.5, "y": 5},
    {"name": "Check Certs", "x": 2, "y": 4},
    {"name": "Find Similar", "x": 2, "y": 3},
    {"name": "Check Compat", "x": 2, "y": 2},
    {"name": "Search Prices", "x": 2, "y": 1},
    {"name": "Price Found?", "x": 2, "y": 0, "shape": "diamond"},
    {"name": "Compare Prices", "x": 0.5, "y": -1},
    {"name": "Search Links", "x": 3.5, "y": -1},
    {"name": "Buy Links", "x": 2, "y": -2}
]

# Add rectangular nodes
for node in nodes:
    if node.get("shape") != "diamond":
        fig.add_shape(
            type="rect",
            x0=node["x"]-0.4, y0=node["y"]-0.15,
            x1=node["x"]+0.4, y1=node["y"]+0.15,
            line=dict(color="#21808d", width=2),
            fillcolor="#e8f4f5"
        )
        fig.add_annotation(
            x=node["x"], y=node["y"],
            text=node["name"],
            showarrow=False,
            font=dict(size=10, color="#13343b"),
            align="center"
        )

# Add diamond decision nodes
for node in nodes:
    if node.get("shape") == "diamond":
        fig.add_shape(
            type="path",
            path=f"M {node['x']-0.4} {node['y']} L {node['x']} {node['y']+0.2} L {node['x']+0.4} {node['y']} L {node['x']} {node['y']-0.2} Z",
            line=dict(color="#21808d", width=2),
            fillcolor="#f3f3ee"
        )
        fig.add_annotation(
            x=node["x"], y=node["y"],
            text=node["name"],
            showarrow=False,
            font=dict(size=9, color="#13343b"),
            align="center"
        )

# Add arrows between nodes
arrows = [
    (2, 10, 2, 9),     # Take Photo -> Extract Text
    (2, 9, 2, 8),      # Extract Text -> Text Found?
    (1.6, 8, 0.9, 7),  # Text Found? -> Retake (No)
    (0.5, 7.15, 2, 9.85),  # Retake -> Take Photo (loop back)
    (2, 7.8, 2, 7.2),  # Text Found? -> Analyze Safety (Yes)
    (2, 7, 2, 6.2),    # Analyze Safety -> Harmful?
    (1.6, 6, 0.9, 5.2),  # Harmful? -> Show Warning (Yes)
    (2.4, 6, 3.1, 5.2),  # Harmful? -> Show Safe (No)
    (0.5, 4.85, 1.6, 4.2),  # Show Warning -> Check Certs
    (3.5, 4.85, 2.4, 4.2),  # Show Safe -> Check Certs
    (2, 4, 2, 3),      # Check Certs -> Find Similar
    (2, 3, 2, 2),      # Find Similar -> Check Compat
    (2, 2, 2, 1),      # Check Compat -> Search Prices
    (2, 1, 2, 0.2),    # Search Prices -> Price Found?
    (1.6, 0, 0.9, -0.8),  # Price Found? -> Compare Prices (Yes)
    (2.4, 0, 3.1, -0.8),  # Price Found? -> Search Links (No)
    (0.5, -1.15, 1.6, -1.8),  # Compare Prices -> Buy Links
    (3.5, -1.15, 2.4, -1.8),  # Search Links -> Buy Links
]

for x1, y1, x2, y2 in arrows:
    fig.add_annotation(
        x=x2, y=y2,
        ax=x1, ay=y1,
        xref='x', yref='y',
        axref='x', ayref='y',
        arrowhead=2,
        arrowsize=1,
        arrowwidth=2,
        arrowcolor="#333333",
        showarrow=True
    )

# Add decision labels
fig.add_annotation(x=1.2, y=7.5, text="No", showarrow=False, font=dict(size=8, color="#13343b"))
fig.add_annotation(x=2.8, y=7.5, text="Yes", showarrow=False, font=dict(size=8, color="#13343b"))
fig.add_annotation(x=1.2, y=5.5, text="Yes", showarrow=False, font=dict(size=8, color="#13343b"))
fig.add_annotation(x=2.8, y=5.5, text="No", showarrow=False, font=dict(size=8, color="#13343b"))
fig.add_annotation(x=1.2, y=-0.5, text="Yes", showarrow=False, font=dict(size=8, color="#13343b"))
fig.add_annotation(x=2.8, y=-0.5, text="No", showarrow=False, font=dict(size=8, color="#13343b"))

# Update layout
fig.update_layout(
    title="CosmicScan User Journey Flow",
    xaxis=dict(range=[-0.5, 4.5], showgrid=False, showticklabels=False, zeroline=False),
    yaxis=dict(range=[-2.5, 10.5], showgrid=False, showticklabels=False, zeroline=False),
    showlegend=False,
    plot_bgcolor='white'
)

# Save the chart
fig.write_image('cosmicscan_flow.png')
fig.write_image('cosmicscan_flow.svg', format='svg')
print("Chart saved successfully")
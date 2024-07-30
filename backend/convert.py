import json

def convert_json_lines_to_array(input_file, output_file):
    """Convert a JSON lines file to a JSON array file."""
    entries = []

    with open(input_file, 'r') as file:
        for line in file:
            line = line.strip()
            if line:
                try:
                    entries.append(json.loads(line))
                except json.JSONDecodeError as e:
                    print(f"Skipping invalid JSON line: {line}")
                    print(f"Error: {e}")

    with open(output_file, 'w') as file:
        json.dump(entries, file, indent=4)

# Convert JSON lines file to JSON array file
convert_json_lines_to_array('keylogs.json', 'formated.json')
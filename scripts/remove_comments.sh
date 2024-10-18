#!/bin/bash

# Function to extract multi-line comments from a JS/JSX file
extract_multiline_comments() {
    local file="$1"
    # Using sed to extract content between /* and */ (JavaScript multi-line comment style)
    sed -n '/\/\*/,/\*\//p' "$file"
}

# Directory or file to process (you can modify this path)
directory="." # or you can specify a file path directly

# Output file to dump the comments
output_file="comments.txt"

# Clear the output file
> "$output_file"

# Find all JS and JSX files and extract comments
find "$directory" -name "*.js" -o -name "*.jsx" | while read -r file; do
    echo "Processing file: $file"
    extract_multiline_comments "$file" >> "$output_file"
    echo -e "\n" >> "$output_file"
done

echo "All comments have been extracted and saved to $output_file."

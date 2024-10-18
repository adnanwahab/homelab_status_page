import re

def extract_multiline_comments(file_path):
    """Extract multi-line comments from the file."""
    with open(file_path, 'r') as file:
        content = file.read()

    # Regex to match multi-line comments in Python (triple quotes)
    multiline_comments = re.findall(r'\"\"\"(.*?)\"\"\"|\'\'\'(.*?)\'\'\'', content, re.DOTALL)

    # Combine results from both double and single quote matches
    comments = [comment[0] or comment[1] for comment in multiline_comments]

    return comments

def dump_to_file(comments, output_file):
    """Dump extracted comments to a text file."""
    with open(output_file, 'w') as f:
        for comment in comments:
            f.write(comment.strip() + '\n\n')

if __name__ == "__main__":
    source_file = 'your_source_file.py'  # Replace with the source file you want to process
    output_file = 'comments.txt'         # File where the comments will be saved
    
    # Extract comments
    comments = extract_multiline_comments(source_file)
    
    # Dump comments to file
    dump_to_file(comments, output_file)

    print(f"Extracted {len(comments)} multi-line comments and saved them to {output_file}.")
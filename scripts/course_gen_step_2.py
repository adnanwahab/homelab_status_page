import time
from concurrent.futures import ThreadPoolExecutor
from openai import OpenAI
import os
import argparse
openai_api_key = os.getenv('OPENAI_KEY')

client = OpenAI(
    api_key=openai_api_key,
)

# find 



json_file_path = 'data/odyssey/modules.json'
input_dir =  "data/odyssey"
output_dir = input_dir

def append_to_file(chunk, index, output_dir):
    with open(f"{output_dir}/parallel_chunk_{index}.txt", 'w') as output_file:
        output_file.write(chunk)
    return chunk

def empty_file(output_dir):
    start_time = time.time()
    with open(f'{output_dir}/journey-4.css.txt', 'w') as output_file:
        pass
    end_time = time.time()
    print(f"Emptying the file took {end_time - start_time:.4f} seconds.")

def parse_gpt(results):
    comp = results
    if len(comp.choices) == 0:
        return None

    message_content = comp.choices[0].message.content
    return message_content

def extract_css(input_text):
    start_marker = "```"
    end_marker = "\n"

    start_idx = input_text.find(start_marker) + len(start_marker)
    end_idx = input_text.find(end_marker)

    css_content = input_text[start_idx:end_idx]
    return css_content


def split_into_chunks(css):
    css_blocks = css.split('\n\n')
    lines_per_chunk = 10
    return [css_blocks[i:i + lines_per_chunk] for i in range(0, len(css_blocks), lines_per_chunk)]

import os

    #print("writing to", actual_file_name)  # Corrected spelling from "wiriting" to "writing"
    

    # return processed
# is jupyter a thing? try collarobaroty - add currsor - to obs+jpy - (LLM_prediciton_planning, cgi, hardware) 
# add in dict types from fastapi - 

queries = {
    "desmos": "gen a javascript code to visualize topic like desmos ",
    "threejs": "gen a javascript code to visualize topic like threejs ",
    "khanacademy": "gen a javascript code to visualize topic like khanacademy",
    "observable": "gen a javascript code to visualize topic like observable",
    "d3js": "gen a javascript code to visualize topic like d3js",
    "research_papers": "links to any related research papers",
    "visualizations": "links to any visualizaions ",
    "videos": "links to videos",
    "tweets": "links to tweets or any social media ",
    "docs": "docs / websites "
}

query_file_ext = {
    "demos": "js",
    "threejs": "js",
    "khanacademy": "js",
    "observable": "js",
    "d3js": "js",
    "research_papers": "md",
    "visualizations": "md",
    "videos": "md",
    "tweets": "md",
    "docs": "md",
    "websites": "md"
}



def process_chunk(folder_name, index):
    prompt = list(queries.values())[index] + f"generate a diagram from the folder name {folder_name} " 
    print(prompt)
    chat_completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt },
            #{"role": "user", "content": content}
        ]
    ) 
    #actual_file_path = folder_name + "/" + index + file_ext
    processed = parse_gpt(chat_completion)
    with open("data/odyssey/" + folder_name + f"/{index}.md", 'w') as file:
        file.write("")
    #file_ext = query_file_ext[query_type]

    
# import previous -> good examples into prompt as screenshots 
# dynamicland is the eval for these promptsa

def process_all_files_in_directory(directory_path):
    folders = [folder for folder in os.listdir(directory_path) if os.path.isdir(os.path.join(directory_path, folder))]
    #folder_name = folders[0]
    start_time = time.time()
    #for query_type in queries:
    for folder in folders:
        for index in range(0, 10):
            process_chunk(folder, index)
    #process_all_files_in_directory(query_type, queries[query_type], input_dir)
   
    # with ThreadPoolExecutor(max_workers=20) as executor:
    #     futures = []
    #     for index, (dir_name) in enumerate(folders):
    #         futures.append(executor.submit(process_chunk, dir_name, index))

    #     for future in futures:
    #         future.result()
    end_time = time.time()
    print("processing all files in directory took", end_time - start_time, "seconds")

process_all_files_in_directory(input_dir)
#queries = [query(micro_query) for micro_query in queries]


# augment this file to pass in 1tb of embeddings to llama / anthropic / openai
# talk 


# (read 5000 research papers + 2 best ourses) -> (gen diagrams) + 1 paragraph per diaagram.


# def parse_arguments():
#     parser = argparse.ArgumentParser(description='Process html files with OpenAI.')

#     parser.add_argument('--query', type=str, required=True, help='Query to send to the LLM.')
#     parser.add_argument('--input_dir', type=str, required=True, help='',)
#     parser.add_argument('--output_dir', type=str, required=True, help='.')

#     return parser.parse_args()


# query = args.query
# input_dir = args.input_dir
# output_dir = args.output_dir
# judgment / design / choice / 
# Initialize the OpenAI client with the API key
# Retrieve the OpenAI API key from the environment variable

#12 - 64
#######1.     file-inputs
########2.   tool-calling (acrorn, treesitter)
#------- playwright -> downlaod all source code -> source data -> store in file.
############------>>>>>>>
# geo hots - implementing VSLAM in 13 hours - link to hn - hes dumb but he just kept trying. (iphone ps4 - )

#######3.   please format this as a github flavored markdown
#######4. links to any related paper 
######5. - links to any visualizaions / js / videos / books / reference on related topic
######6
######7.
#####8
### this i guaranted to work 
# "Introduction to Robotics: Mechanics and Control" by John J. Craig – A foundational textbook covering the essentials of kinematics, dynamics, and control theory.
# "Modern Robotics: Mechanics, Planning, and Control" by Kevin M. Lynch and Frank C. Park – A comprehensive guide using contemporary screw theory to explore robot physics and algorithms.
# "Principles of Robot Motion" by Howie Choset, Kevin M. Lynch, and others – Focuses on motion planning, algorithms, and theory for robot movement.
# "Robotics, Vision and Control" by Peter Corke – A hands-on guide with MATLAB examples, ideal for understanding both robotics and computer vision.
# "Learning Robotics Using Python" by Lentin Joseph – A beginner-friendly book that walks through robot programming and development with Python.
# "The Robotics Primer" by Maja J. Matarić – Offers a broad introduction to robotics, ideal for students and beginners in the field.
# "Introduction to Autonomous Mobile Robots" by Roland Siegwart, Illah R. Nourbakhsh, and Davide Scaramuzza – Covers the mechanics and applications of mobile robotics, including real-world case studies.
# "Humanoid Robots: Modeling and Control" by Tamim Asfour and others – Focuses on the control algorithms and design of humanoid robots.
# "Service Robots: Advances in Research and Applications" – Explores how robots are used in public services, healthcare, agriculture, and beyond.
# "The Master Algorithm" by Pedro Domingos – Though broader in scope, this book discusses AI-driven robotics and the quest for a universal learning algorithm.

# Modern Robotics: Mechanics, Planning, and Control by Kevin M. Lynch and Frank C. Park – A comprehensive guide that covers robot mechanics, motion planning, and control in depth, ideal for both academics and practitioners.

# Introduction to Robotics: Mechanics and Control by John J. Craig – A classic text focused on kinematics, dynamics, and trajectory control, suitable for students and professionals alike.

# Planning Algorithms by Steven M. LaValle – An in-depth exploration of various planning algorithms used in robotics, including discrete, continuous, and motion planning techniques.

# Principles of Robot Motion: Theory, Algorithms, and Implementations by Howie Choset and others – A detailed resource that connects theoretical concepts with practical implementations in robot motion.

# Robotics: Modelling, Planning and Control by Bruno Siciliano and Lorenzo Sciavicco – This book covers fundamental robotics topics, including dynamics, motion control, and planning, with an emphasis on both mobile and manipulator robots.

# Introduction to Autonomous Mobile Robots by Roland Siegwart, Illah R. Nourbakhsh, and Davide Scaramuzza – Focuses on the unique challenges of autonomous mobile robots, covering locomotion, perception, and navigation strategies.

# Mechanics of Robotic Manipulation by Matthew T. Mason – A deeper dive into robotic manipulation, emphasizing kinematic and dynamic aspects of controlling robot arms.

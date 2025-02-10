from jinja2 import Environment, FileSystemLoader
import markdown 
import os
import ast



blog_list_template = Environment(
        loader=FileSystemLoader("templates/")
    )
list_template = blog_list_template.get_template("work_list.html")
post_template = blog_list_template.get_template("project.html")



def parse_file_header(filename):
    """
    Every file begins with the structure bellow. The goal is to parse it, to understand what to do with the file and metadata
    ---
    header_name: values
    ...
    ---
    
    Content
    """
    file = open(filename, "r")
    line = file.readline()

    content = {}
    meta_tag = False # value saying if we encountered "---" already
    while line:
        if line.startswith("---") and meta_tag == False:
            meta_tag = True #debut contenu metadata
        elif line.startswith("---") and meta_tag == True:
            break #end of parsing
        else:
            #read content into variables
            try:
                linecontent = line.split(": ") # there needs to be a space... be careful when writing it
                if linecontent[0] in ["images_list", "skills"]:
                    linecontent[1] = ast.literal_eval(linecontent[1])
                    content[linecontent[0]] = linecontent[1]
                else:
                    content[linecontent[0]] = linecontent[1].strip()
            except Exception as e:
                print(f"error: {e}")
                print(f"Could not parse haeder content for file {filename} because it did not find the \"varname: value\" in it")
                print("Ignoring whatever what on that line")
        line = file.readline()


    # once header parsed, get all the content (no vairable or anything: just raw html block)
    body = ""
    line = file.readline()
    body += line
    while line:
        line = file.readline()
        body += line
    file.close()
    body = str(body)

    html_body = markdown.markdown(body)


    return {"headers": content, "body": html_body} 



articles_list = [
]


# goingthrough all files in directory and parsing them
files = os.listdir("./")
for file in files:
    if file.endswith(".md"):
        # parse article header --- header --- to get title/other meta data +body parsed in html
        content = parse_file_header(file)
        if content['headers']['draft'] == "false":
            articles_list.append(content)
        else:
            print(f"file {file} is in draft mode")
    else:
        continue




# creating hte html from tempalte and file content
for project in articles_list:
    # Render the individual blog post here
    filename = project['headers']['filename_html']
    header = project['headers']
    content = post_template.render(
        title=header['title'],
        subtitle=header['subtitle'],
        html_body=project['body'],
        filename_html=header['filename_html'],
        images_url=header['images_list'],
        html_description=header['html_description'],
        og_title=header['og_title'],
        og_image_url=header['og_image_url'],
        og_description=header['og_description'],
        og_image_alt=header['og_image_alt'],
        skills=header['skills'],
        page_title=header['page_title'],
    )




    #TODO: put posts in posts folder and put blog list in blog folder
    with open("../work/"+filename, mode="w", encoding="utf-8") as message:
        message.write(content)
        print(f"... wrote {filename}")

print("done writing single articles")


# render the blog list page
filename = "index.html"
# print(articles_list)
content = list_template.render(
        project_list=articles_list
)
with open("../"+filename, mode="w", encoding="utf-8") as message:
    message.write(content)
    print(f"... wrote {filename}")


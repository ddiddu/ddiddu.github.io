from langchain.chat_models import ChatOpenAI
from langchain.schema import AIMessage, HumanMessage
import openai
import gradio as gr
import os

os.environ["OPENAI_API_KEY"] = "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"  # Replace with your key
llm = ChatOpenAI(temperature=1.0, model='gpt-3.5-turbo-0613')

question_json = {
  "questions": [
    { 
      "question": "What are Jisu's current projects?",
      "answer": [
          "1. Understanding AI Use and Non-use in Slide Creation with Google Workspace * The rise of advanced Artificial Intelligence (AI) tools has significantly altered how people create work deliverables. This project explores how AI has changed the landscape of slide creation. We aim to understand the user process, identify pain points, determine the AI tools used, and ascertain when and why people opt not to use AI tools. Our findings will inform improvements for Google Workspace products, especially Google Vids and Google Slides.", 
          "2. SAMI: AI-Mediated Social Interaction in Online Learning Environments * SAMI (Social Agent Mediated Interactions) is an AI social agent that facilitates the building of social connections among online students through AI-mediated social interaction. AI-mediated social interaction is the AI-facilitated process of building and maintaining social connections between individuals through information inferred from people’s online posts. SAMI addresses the pressing need for social connections, and the challenges of remote social interactions that online students often face, thus enhancing their sense of community and engagement in the learning process. * link to workshop paper [http://jisulog.kim/workshop1.pdf]"
      ]
    },
    {
      "question": "What are Jisu's publications?",
      "answer": [
          "1. Engaging Learnersourcing with an AI Social Agent in Online Learning * Jisu Kim, Ashok Goel * L@S 2024 Workshop on Learnersourcing: Student-generated Content @ Scale * Link to PDF [http://jisulog.kim/workshop1.pdf]"
          "2. One vs. Many: Comprehending Accurate Information from Multiple Erroneous and Inconsistent AI Generations * Yoonjoo Lee, Kihoon Son, Tae Soo Kim, Jisu Kim, John Joon Young Chung, Eytan Adar, Juho Kim * FAccT 2024: ACM Conference on Fairness, Accountability, and Transparency * Link to ArXiv paper[https://arxiv.org/abs/2405.05581]"
      ]
    },
    {
      "question": "How can I reach out to Jisu?",
      "answer": {
        "email": "jisulog.k@gmail.com",
        "linkedin": "https://www.linkedin.com/in/jisulog/",
        "twitter": "https://x.com/jisukiim?s=21",
        "invitation": "If you are interested in collaboration, please reach out to me! I'm always happy to chat!"
      }
    },
  ]
}

cv_json = {
  "name": "Jisu Kim",
  "location": "Atlanta, GA",
    "CV": "https://ddiddu.github.io/JisuKim_CV.pdf",
  "contact" : [
    {
      "email": "jisulog.k@gmail.com",
      "phone": "(470) 652 9854",
      "linkedin": "https://www.linkedin.com/in/jisulog/",
      "twitter": "https://x.com/jisukiim?s=21",
      "invitation": "If you are interested in collaboration, please reach out to me! I'm always happy to chat!",
    }
  ],
  "education": [
    {
      "institution": "Georgia Institute of Technology (GT)",
      "degree": "Master of Science in Human-Computer Interaction",
      "additional_program": "Undergraduate Exchange Program in Computer Science",
      "location": "Atlanta, GA",
      "completion_date": "May 2025"
    },
    {
      "institution": "Korea Advanced Institute of Science and Technology (KAIST)",
      "degree": "Bachelor of Science in Computer Science, Minor in Artificial Intelligence",
      "additional_major": "Double Major in Business and Technology Management",
      "location": "Daejeon, Korea",
      "completion_date": "August 2023"
    }
  ],
  "research_interests": {
    "summary": "My research interests lie at the intersection of artificial intelligence (AI) and human-computer interaction (HCI). I am focused on enhancing both productivity tools and creativity support tools in learning environments. My goal is to develop AI technologies that enrich the learning experience and enhance human-AI interaction. Driven by my passion for creating human-centric AI technologies, I am applying to Ph.D. programs for Fall 2025.",
    "keywords": ["HCI", "Human-Centered AI", "Human-AI Interaction", "Human-AI Collaboration", "Learning Sciences"]
  },
  "current_project": [
    {
      "title": "Understanding AI Use and Non-use in Slide Creation with Google Workspace",
      "description": "The rise of advanced Artificial Intelligence (AI) tools has significantly altered how people create work deliverables. This project explores how AI has changed the landscape of slide creation. We aim to understand the user process, identify pain points, determine the AI tools used, and ascertain when and why people opt not to use AI tools. Our findings will inform improvements for Google Workspace products, especially Google Vids and Google Slides."
    },
    {
      "title": "SAMI: AI-Mediated Social Interaction in Online Learning Environments",
      "description": "SAMI (Social Agent Mediated Interactions) is an AI social agent that facilitates the building of social connections among online students through AI-mediated social interaction. AI-mediated social interaction, as defined by Wang et al. [11], is “the AI-facilitated process of building and maintaining social connections between in- dividuals through information inferred from people’s online posts.” SAMI addresses the pressing need for social connections, and the challenges of remote social interactions that online students often face, thus enhancing their sense of community and engagement in the learning process.",
      "workshop_paper": "http://jisulog.kim/workshop1.pdf"
    }
  ],
  # "research_experience": [
  #   {
  #     "lab": "Design Intelligence Lab (DILab)",
  #     "position": "Graduate Researcher",
  #     "advisor": "Ashok Goel",
  #     "location": "Atlanta, GA",
  #     "duration": "Jan. 2024 – Present",
  #     "project": "SAMI: AI-Mediated Social Interaction in online learning environments",
  #     "responsibilities": ["Designed a learnersourcing system using an AI social agent to enhance both intrinsic and extrinsic motivation of learners."]
  #   },
  #   {
  #     "lab": "KAIST Interaction Lab (KIXLab)",
  #     "position": "Undergraduate Researcher",
  #     "advisor": "Juho Kim",
  #     "location": "Daejeon, Korea",
  #     "duration": "Jan. 2022 – Aug. 2023",
  #     "projects": [
  #       {
  #         "name": "StupidTutor",
  #         "description": "Understanding users’ comprehension ability from inconsistent large language models (LLMs)",
  #         "responsibilities": ["Identified five types of output inconsistencies and designed a user study to understand users’ interaction with LLMs.", "Spearheaded data analysis and visualization of a user study with 250+ participants using Pandas with Python and R.", "Developed the back-end for a user study interface using SQLite and Flask, collaborating with a front-end developer."]
  #       },
  #       {
  #         "name": "Grinder",
  #         "description": "Designing object detection based on human-AI collaboration in video commerce",
  #         "responsibilities": ["Led 20+ remote unmoderated usability tests encompassing both qualitative studies and quantitative benchmark studies."]
  #       }
  #     ]
  #   },
  #   {
  #     "lab": "GT Co-Well Computer Lab",
  #     "position": "Undergraduate Researcher",
  #     "advisor": "Jennifer Kim",
  #     "location": "Atlanta, GA",
  #     "duration": "Aug. 2022 – Dec.2022",
  #     "project": "Pioneering virtual reality and explainable AI for neurodiversity in remote work scenarios",
  #     "responsibilities": ["Contrasted and evaluated several AI models and created different styles of explanations to display AI predictions."]
  #   }
  # ],
  "industry_experience": [
    {
      "company": "Tesla Inc.",
      "position": "Incoming Machine Learning Intern",
      "location": "Fremont, CA",
      "duration": "Aug. 2024 – Jan. 2025",
      "project": "ML/NLP for data modeling, sales and customer analytics",
    },
    {
      "company": "Samsung SDS Co., Ltd. (Samsung Data System)",
      "position": "Machine Learning Intern",
      "location": "Seoul, Korea",
      "duration": "Mar. 2021 – Aug. 2021",
      "project": "Developing a real-time background segmentation model for the video conference platform",
      "achievements": ["Developed a PyTorch model achieving 1.5x speed, 34% reduced loss, and 14% fewer parameters than the base model.", "Leveraged unlabeled dataset training by knowledge distillation, improving accuracy by transfer learning and fine-tuning.", "Integrated the developed model into Knox Meeting, a Samsung video conferencing platform."]
    },
    {
      "company": "Samsung Electronics Co., Ltd.",
      "position": "Data Science Intern",
      "location": "Seoul, Korea",
      "duration": "Jul. 2020 – Aug. 2020",
      "project": "Data analysis of Key Performance Indicators (KPIs) from LTE Evolved NodeBs (eNBs) statistical data for KPI Modeling",
      "responsibilities": ["Extracted KPIs from LTE eNBs data and performed correlation analysis using Pandas with Python.", "Collaborated with machine learning developers to optimize LTE eNB KPI Modeling based on identified correlations."]
    }
  ],
  "publications": [
    {
      "title": "Engaging Learnersourcing with an AI Social Agent in Online Learning",
      "authors": "Jisu Kim, Ashok Goel",
      "conference": "L@S 2024 Workshop on Learnersourcing: Student-generated Content @ Scale.",
      "pdf": "http://jisulog.kim/workshop1.pdf",
    },
    {
      "title": "One vs. Many: Comprehending Accurate Information from Multiple Erroneous and Inconsistent AI Generations",
      "authors": "Yoonjoo Lee, Kihoon Son, Tae Soo Kim, Jisu Kim, John Joon Young Chung, Eytan Adar, Juho Kim",
      "conference": "FAccT 2024: ACM Conference on Fairness, Accountability, and Transparency.",
      "arxiv": "https://arxiv.org/abs/2405.05581",
      "description": "As Large Language Models (LLMs) are nondeterministic, the same input can generate different outputs, some of which may be incorrect or hallucinated. If run again, the LLM may correct itself and produce the correct answer. Unfortunately, most LLM-powered systems resort to single results which, correct or not, users accept. Having the LLM produce multiple outputs may help identify disagreements or alternatives. However, it is not obvious how the user will interpret conflicts or inconsistencies. To this end, we investigate how users perceive the AI model and comprehend the generated information when they receive multiple, potentially inconsistent, outputs. Through a preliminary study, we identified five types of output inconsistencies. Based on these categories, we conducted a study (N=252) in which participants were given one or more LLM-generated passages to an information-seeking question. We found that inconsistency within multiple LLM-generated outputs lowered the participants' perceived AI capacity, while also increasing their comprehension of the given information. Specifically, we observed that this positive effect of inconsistencies was most significant for participants who read two passages, compared to those who read three. Based on these findings, we present design implications that, instead of regarding LLM output inconsistencies as a drawback, we can reveal the potential inconsistencies to transparently indicate the limitations of these models and promote critical LLM usage."
    }
  ],
  # "projects": [
  #   {
  #     "name": "Seminars on Introduction to AI and Computer Vision at Samsung SDS",
  #     "role": "Speaker and Blog Editor",
  #     "description": "Hosted a monthly team seminar at Samsung SDS titled ‘Introduction to AI for Novices’ and ‘Background Segmentation using Deep Learning’ with content published on a Medium blog, achieving over 2k views monthly and a total of 40k views. Authored a highly popular blog post on ‘Image Classification’, which ranks in the top 3 Google search results in Korean."
  #   },
  #   {
  #     "name": "FORECST, Online Hackathon Website",
  #     "role": "Project Leader",
  #     "description": "Directed a team of 4 in the end-to-end website development from ideation to deployment using React.js and Firebase, facilitating remote participation during the COVID-19 pandemic.",
  #     "demo": "https://www.youtube.com/watch?v=l5le0iE8PNc&ab_channel=JeanneChoi"
  #   }
  # ],
  "leadership_and_activities": [
    {
      "role": "Committee Member",
      "organization": "GT International House",
      "year": "2022"
    },
    {
      "role": "Student President",
      "organization": "KAIST School of Computing",
      "year": "2020"
    },
    {
      "role": "Project Leader",
      "organization": "KAIST Mad Camp",
      "year": "2019"
    },
    {
      "role": "Mentor",
      "organization": "Tanzania ICT Volunteers",
      "year": "2019"
    },
    {
      "role": "Team Leader",
      "organization": "KAIST Badminton Club",
      "year": "2019"
    }
  ],
  "teaching_experience": [
    {
      "organization": "NAVER Connect Foundation",
      "role": "Coding Coach",
      "location": "Seoul, Korea",
      "duration": "May. 2021 – Jul. 2021",
      "description": "Mentored 25 college-level and above students in the Python Boost course."
    },
    {
      "organization": "LG Electronics Inc.",
      "role": "Education Operations Mentor",
      "location": "Daejeon, Korea",
      "duration": "Mar. 2019 – Dec. 2019",
      "description": "Organized Arduino, CAD, and 3D printer classes for 48 students from multicultural families."
    }
  ],
  "honors_and_awards": [
    {
      "award": "Outstanding Graduate Leadership Award",
      "year": "2024"
    },
    {
      "award": "Magna Cum Laude",
      "year": "2024"
    },
    {
      "award": "GT International House I-Spirit Award",
      "year": "2022"
    },
    {
      "award": "Mirae Asset Park Hyeun Joo Foundation Overseas Exchange Scholarship",
      "year": "2022"
    },
    {
      "award": "2nd Place, World Friends Korea ICT Volunteers Project Award",
      "year": "2019"
    },
    {
      "award": "2nd Place, KAIST Athletics Doubles Badminton Award",
      "year": "2018"
    },
    {
      "award": "1st Place, KAIST Civil and Environmental Engineering Undergraduate Research Award",
      "year": "2018"
    }
  ],
  "skills": {
    "programming_languages": ["Python", "R", "Java", "JavaScript", "C", "C#", "CSS", "HTML", "PHP", "MATLAB", "Assembly"],
    "frameworks_libraries": ["TensorFlow", "PyTorch", "Keras", "CUDA", "Scikit-Learn", "OpenCV", "React.js", "Node.js", "Pandas", "NumPy", "SciPy"],
    "tools_software": ["Android Studio", "Git", "Linux", "Jupyter", "Arduino", "SQL", "MongoDB", "Flask", "Firebase", "Processing", "CAD", "Figma"]
  }
}

def predict(message, history):
    if find(message):
      prompt = (
          f"As Jisu(she/her/hers)'s personal assistant,"
          f"Given that: {question_json}, How can I assist with information on: {message}"
      )
          
      response = llm([HumanMessage(content=prompt)])
      return response.content
      
    prompt = (
        f"As Jisu(she/her/hers)'s personal assistant,"
        f"Given that: {cv_json}, How can I assist with information on: {message}"
        f"If source does not contains relevant information, I will state that the information is not available."
    )
        
    response = llm([HumanMessage(content=prompt)])
    return response.content

def find(message):
    prompt = (
        "Given the list of questions about Jisu's CV: \n"
        "- What are Jisu's current projects?\n"
        "- What are Jisu's publications?\n"
        "- How can I reach out to Jisu?\n"
        f"Determine if the following query matches any of the topics above: '{message}'. Answer 'Yes' if it matches, otherwise answer 'No'."
    )
    
    response = llm([HumanMessage(content=prompt)])
    if response.content.strip() == 'Yes':
        return True
    else:
        return False

# Example inputs as buttons
examples = [
    "What are Jisu's current projects?",
    "What are Jisu's publications?",
    "How can I reach out to Jisu?",
    # "How is the answer generated?"
]

with gr.Blocks(theme='gradio/soft', fill_height=True) as demo:
    gr.Markdown(
    """
    <img src="http://jisulog.kim/profile.png" alt="Profile Image" style="width: 200px; height: auto; border-radius: 50%;">
    
    # 😊 Hi, I am Jisu Kim!

    I am an MS candidate in the **Interactive Computing** at 🐝**Georgia Tech**. I am advised by [**Ashok Goel**](https://dilab.gatech.edu/ashok-k-goel/) and [**Richmond Wong**](https://richmondywong.com/), and was previously advised by [**Juho Kim**](https://juhokim.com/) at 🪿**KAIST**. 
    
    My research interests lie at the intersection of artificial intelligence (AI) and human-computer interaction (HCI). I am focused on enhancing both productivity tools and creativity support tools in learning environments. My goal is to develop AI technologies that enrich the learning experience and enhance human-AI interaction. Driven by my passion for creating human-centric AI technologies, I am applying to Ph.D. programs for Fall 2025!

    [**LinkedIn**](https://www.linkedin.com/in/jisulog/) | [**Twitter**](https://x.com/jisukiim?s=21) | [**CV**](https://ddiddu.github.io/JisuKim_CV.pdf) | [**YouTube**](https://youtu.be/btZOScj22jE?si=0zz5y61KNLsBJXcm)

    ---

    # 🤖 Hi, I am Jisu's personal assistant!

    **Ask about Jisu and I will provide you with the information as far as I know.** 

    I am currently under development. If there are errors or improvements, feel free to share with Jisu! You don't know how to reach out to Jisu? **Ask me!**
    """)
    gr.ChatInterface(predict, examples=examples)
    
if __name__ == "__main__":
    demo.launch(share=True)

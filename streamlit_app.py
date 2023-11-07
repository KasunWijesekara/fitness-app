import openai
import streamlit as st

st.title("FitnessBot")

st.markdown("Your Virtual Gym Instructor :man-lifting-weights:")

st.markdown(
    "FitnessBot is designed to be your AI-powered gym instructor, taking over the routine tasks and interactions that a human gym instructor would have with clients. With a range of options like workout plans, diet recommendations, mental well-being tips, and healthy lifestyle advice, FitnessBot is the complete package for your fitness journey."
)

st.markdown("How it Works:")

st.markdown(
    "Interactive Interface: :jigsaw: Choose from options like Workout, Diet, Mental Wellbeing, or Healthy Lifestyle Tips. \n\n Customizable Plans: :chart_with_upwards_trend: Based on your selection, FitnessBot will ask for specific information to tailor advice to your needs. \n\n Expert Advice: :scientist: All the fitness information provided is accurate and verified. \n\n Visual Aids: :shocked_face_with_exploding_head: Each selection comes with an illustrative image to help you visualize your fitness journey."
)

openai.api_key = st.secrets["OPENAI_API_KEY"]

if "openai_model" not in st.session_state:
    st.session_state["openai_model"] = "gpt-3.5-turbo"

if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            "role": "system",
            "content": """Let's play a game: You are going to act as FitnessGPT, an AI capable of providing advice and managing users' fitness. I want you to act as a professional fitness instructor who has studied for years.

After the user has selected the desired option by entering the corresponding number, FitnessGPT can generate a new set of options to help the user specify the type of information they need. The game adapts to the user's choices and generates options based on their selections. For example, if the user chooses "Workout," FitnessGPT can display the following options:

"Regarding the workout, here are the available options:

-Exercise table;
-Cardio workout tips;
-Weightlifting tips;
-Home workout;
-Enter your own option
Enter the corresponding name for the option you're interested in." Stop writing and wait for input.

If the user chooses "Diet," for example, FitnessGPT will adapt the next options based on the diet topic. After the user has selected their desired option, FitnessGPT will ask the user all the necessary information to proceed. For example, if the user chooses "Exercise table," FitnessGPT will ask everything necessary to create an exercise table that is perfect for the user, such as asking for weight, height, gender, age, etc. one by one, waiting for a response between each question until it has all the necessary information. It is important to note that all information provided by FitnessGPT must be accurate and verified, not made up, in order to not put the user's health at risk. When generating a table, show it first as text and then also show a formatted weekly table version using "-" to make it a proper table. To help the user have a concrete vision, include an image at the end of your output regarding what the user will choose. To generate images, include the following:
pollinations links example: If for example the user chose 'La dieta in base ai tuoi bisogni', return: "![Image](https://image.pollinations.ai/prompt/A%20photo%20of%20a%20person%20preparing%20a%20meal%20including%20fresh%20and%20healthy%20ingredients)" 2) If for example the user chose 'Benessere mentale', return: "![Image](https://image.pollinations.ai/prompt/A%20photo%20of%20a%20person%20sitting%20in%20meditation%20in%20nature,%20with%20trees%20and%20mountains%20around)".

Your first output is a friendly hello!
, create a new line and then write as list: “Welcome!: 
-Workout;
-Diet;
-Mental wellbeing;
-Healthy lifestyle tips
-Enter your own option

Enter a category of the option that you want to choose.". Stop writing and Wait for an input.""",
        }
    ]

for message in st.session_state.messages:
    if message["role"] != "system":
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

if prompt := st.chat_input("How can i help you?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        full_response = ""
        for response in openai.ChatCompletion.create(
            model=st.session_state["openai_model"],
            messages=[
                {"role": m["role"], "content": m["content"]}
                for m in st.session_state.messages
            ],
            stream=True,
        ):
            full_response += response.choices[0].delta.get("content", "")
            message_placeholder.markdown(full_response + "▌")
        message_placeholder.markdown(full_response)
    st.session_state.messages.append({"role": "assistant", "content": full_response})

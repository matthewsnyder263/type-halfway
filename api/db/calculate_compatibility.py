def calculate_compatibility(type1, type2):
    error_message = None
    compatibility_chart = {
        "INFP": {"INFP":"GOOD", "ENFP":"GOOD", "INFJ":"GOOD", "ENFJ":"PERFECT", "INTJ":"GOOD", "ENTJ":"PERFECT", "INTP":"GOOD", "ENTP":"GOOD", "ISFP":"BAD", "ESFP":"BAD", "ISTP":"BAD", "ESTP":"BAD", "ISFJ":"BAD", "ESFJ":"BAD", "ISTJ":"BAD", "ESTJ": "BAD"},
        "ENFP": {"INFP":"GOOD", "ENFP":"GOOD", "INFJ":"PERFECT", "ENFJ":"GOOD", "INTJ":"PERFECT", "ENTJ":"GOOD", "INTP":"GOOD", "ENTP":"GOOD", "ISFP":"BAD", "ESFP":"BAD", "ISTP":"BAD", "ESTP":"BAD", "ISFJ":"BAD", "ESFJ":"BAD", "ISTJ":"BAD", "ESTJ": "BAD"},
        "INFJ": {"INFP":"GOOD", "ENFP":"PERFECT", "INFJ":"GOOD", "ENFJ":"GOOD", "INTJ":"GOOD", "ENTJ":"GOOD", "INTP":"GOOD", "ENTP":"PERFECT", "ISFP":"BAD", "ESFP":"BAD", "ISTP":"BAD", "ESTP":"BAD", "ISFJ":"BAD", "ESFJ":"BAD", "ISTJ":"BAD", "ESTJ": "BAD"},
        "ENFJ": {"INFP":"PERFECT", "ENFP":"GOOD", "INFJ":"GOOD", "ENFJ":"GOOD", "INTJ":"GOOD", "ENTJ":"GOOD", "INTP":"GOOD", "ENTP":"GOOD", "ISFP":"PERFECT", "ESFP":"BAD", "ISTP":"BAD", "ESTP":"BAD", "ISFJ":"BAD", "ESFJ":"BAD", "ISTJ":"BAD", "ESTJ": "BAD"},
        "INTJ": {"INFP":"GOOD", "ENFP":"PERFECT", "INFJ":"GOOD", "ENFJ":"GOOD", "INTJ":"GOOD", "ENTJ":"GOOD", "INTP":"GOOD", "ENTP":"PERFECT", "ISFP":"AVERAGE", "ESFP":"AVERAGE", "ISTP":"AVERAGE", "ESTP":"AVERAGE", "ISFJ":"POOR", "ESFJ":"POOR", "ISTJ":"POOR", "ESTJ": "POOR"},
        "ENTJ": {"INFP":"PERFECT", "ENFP":"GOOD", "INFJ":"GOOD", "ENFJ":"GOOD", "INTJ":"GOOD", "ENTJ":"GOOD", "INTP":"PERFECT", "ENTP":"GOOD", "ISFP":"AVERAGE", "ESFP":"AVERAGE", "ISTP":"AVERAGE", "ESTP":"AVERAGE", "ISFJ":"AVERAGE", "ESFJ":"AVERAGE", "ISTJ":"AVERAGE", "ESTJ": "AVERAGE"},
        "INTP": {"INFP":"GOOD", "ENFP":"GOOD", "INFJ":"GOOD", "ENFJ":"GOOD", "INTJ":"GOOD", "ENTJ":"PERFECT", "INTP":"GOOD", "ENTP":"GOOD", "ISFP":"AVERAGE", "ESFP":"AVERAGE", "ISTP":"AVERAGE", "ESTP":"AVERAGE", "ISFJ":"POOR", "ESFJ":"POOR", "ISTJ":"POOR", "ESTJ": "PERFECT"},
        "ENTP": {"INFP":"GOOD", "ENFP":"GOOD", "INFJ":"PERFECT", "ENFJ":"GOOD", "INTJ":"PERFECT", "ENTJ":"GOOD", "INTP":"GOOD", "ENTP":"GOOD", "ISFP":"AVERAGE", "ESFP":"AVERAGE", "ISTP":"AVERAGE", "ESTP":"AVERAGE", "ISFJ":"POOR", "ESFJ":"POOR", "ISTJ":"POOR", "ESTJ": "POOR"},
        "ISFP": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"PERFECT", "INTJ":"AVERAGE", "ENTJ":"AVERAGE", "INTP":"AVERAGE", "ENTP":"AVERAGE", "ISFP":"POOR", "ESFP":"POOR", "ISTP":"POOR", "ESTP":"POOR", "ISFJ":"AVERAGE", "ESFJ":"PERFECT", "ISTJ":"AVERAGE", "ESTJ": "PERFECT"},
        "ESFP": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"AVERAGE", "ENTJ":"AVERAGE", "INTP":"AVERAGE", "ENTP":"AVERAGE", "ISFP":"POOR", "ESFP":"POOR", "ISTP":"POOR", "ESTP":"POOR", "ISFJ":"PERFECT", "ESFJ":"AVERAGE", "ISTJ":"PERFECT", "ESTJ": "AVERAGE"},
        "ISTP": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"AVERAGE", "ENTJ":"AVERAGE", "INTP":"AVERAGE", "ENTP":"AVERAGE", "ISFP":"POOR", "ESFP":"POOR", "ISTP":"POOR", "ESTP":"POOR", "ISFJ":"AVERAGE", "ESFJ":"PERFECT", "ISTJ":"AVERAGE", "ESTJ": "PERFECT"},
        "ESTP": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"AVERAGE", "ENTJ":"AVERAGE", "INTP":"AVERAGE", "ENTP":"AVERAGE", "ISFP":"POOR", "ESFP":"POOR", "ISTP":"POOR", "ESTP":"POOR", "ISFJ":"PERFECT", "ESFJ":"AVERAGE", "ISTJ":"PERFECT", "ESTJ": "AVERAGE"},
        "ISFJ": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"POOR", "ENTJ":"AVERAGE", "INTP":"POOR", "ENTP":"POOR", "ISFP":"AVERAGE", "ESFP":"PERFECT", "ISTP":"AVERAGE", "ESTP":"PERFECT", "ISFJ":"GOOD", "ESFJ":"GOOD", "ISTJ":"GOOD", "ESTJ": "GOOD"},
        "ESFJ": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"POOR", "ENTJ":"AVERAGE", "INTP":"POOR", "ENTP":"POOR", "ISFP":"PERFECT", "ESFP":"AVERAGE", "ISTP":"PERFECT", "ESTP":"AVERAGE", "ISFJ":"GOOD", "ESFJ":"GOOD", "ISTJ":"GOOD", "ESTJ": "GOOD"},
        "ISTJ": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"POOR", "ENTJ":"AVERAGE", "INTP":"POOR", "ENTP":"POOR", "ISFP":"AVERAGE", "ESFP":"PERFECT", "ISTP":"AVERAGE", "ESTP":"PERFECT", "ISFJ":"GOOD", "ESFJ":"GOOD", "ISTJ":"GOOD", "ESTJ": "GOOD"},
        "ESTJ": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"POOR", "ENTJ":"AVERAGE", "INTP":"PERFECT", "ENTP":"POOR", "ISFP":"PERFECT", "ESFP":"AVERAGE", "ISTP":"PERFECT", "ESTP":"AVERAGE", "ISFJ":"GOOD", "ESFJ":"GOOD", "ISTJ":"GOOD", "ESTJ": "GOOD"}
        }
    # if len(type1) < 4 or len(type2) < 4:
    #     error_message = "Please enter a valid MBTI type consisting of 4 letters. e link above"
    #     return error_message
    if type1 not in compatibility_chart or type2 not in compatibility_chart:
        error_message = "Please enter a valid MBTI type."
        return error_message
    else:
        return compatibility_chart[type1][type2]

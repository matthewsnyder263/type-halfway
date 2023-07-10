# def calculate_compatibility(user_id_1, user_id_2):
#     error_message = None
#     compatibility_chart = {
#         "INFP": {"INFP":"GOOD", "ENFP":"GOOD", "INFJ":"GOOD", "ENFJ":"PERFECT", "INTJ":"GOOD", "ENTJ":"PERFECT", "INTP":"GOOD", "ENTP":"GOOD", "ISFP":"BAD", "ESFP":"BAD", "ISTP":"BAD", "ESTP":"BAD", "ISFJ":"BAD", "ESFJ":"BAD", "ISTJ":"BAD", "ESTJ": "BAD"},
#         "ENFP": {"INFP":"GOOD", "ENFP":"GOOD", "INFJ":"PERFECT", "ENFJ":"GOOD", "INTJ":"PERFECT", "ENTJ":"GOOD", "INTP":"GOOD", "ENTP":"GOOD", "ISFP":"BAD", "ESFP":"BAD", "ISTP":"BAD", "ESTP":"BAD", "ISFJ":"BAD", "ESFJ":"BAD", "ISTJ":"BAD", "ESTJ": "BAD"},
#         "INFJ": {"INFP":"GOOD", "ENFP":"PERFECT", "INFJ":"GOOD", "ENFJ":"GOOD", "INTJ":"GOOD", "ENTJ":"GOOD", "INTP":"GOOD", "ENTP":"PERFECT", "ISFP":"BAD", "ESFP":"BAD", "ISTP":"BAD", "ESTP":"BAD", "ISFJ":"BAD", "ESFJ":"BAD", "ISTJ":"BAD", "ESTJ": "BAD"},
#         "ENFJ": {"INFP":"PERFECT", "ENFP":"GOOD", "INFJ":"GOOD", "ENFJ":"GOOD", "INTJ":"GOOD", "ENTJ":"GOOD", "INTP":"GOOD", "ENTP":"GOOD", "ISFP":"PERFECT", "ESFP":"BAD", "ISTP":"BAD", "ESTP":"BAD", "ISFJ":"BAD", "ESFJ":"BAD", "ISTJ":"BAD", "ESTJ": "BAD"},
#         "INTJ": {"INFP":"GOOD", "ENFP":"PERFECT", "INFJ":"GOOD", "ENFJ":"GOOD", "INTJ":"GOOD", "ENTJ":"GOOD", "INTP":"GOOD", "ENTP":"PERFECT", "ISFP":"AVERAGE", "ESFP":"AVERAGE", "ISTP":"AVERAGE", "ESTP":"AVERAGE", "ISFJ":"POOR", "ESFJ":"POOR", "ISTJ":"POOR", "ESTJ": "POOR"},
#         "ENTJ": {"INFP":"PERFECT", "ENFP":"GOOD", "INFJ":"GOOD", "ENFJ":"GOOD", "INTJ":"GOOD", "ENTJ":"GOOD", "INTP":"PERFECT", "ENTP":"GOOD", "ISFP":"AVERAGE", "ESFP":"AVERAGE", "ISTP":"AVERAGE", "ESTP":"AVERAGE", "ISFJ":"AVERAGE", "ESFJ":"AVERAGE", "ISTJ":"AVERAGE", "ESTJ": "AVERAGE"},
#         "INTP": {"INFP":"GOOD", "ENFP":"GOOD", "INFJ":"GOOD", "ENFJ":"GOOD", "INTJ":"GOOD", "ENTJ":"PERFECT", "INTP":"GOOD", "ENTP":"GOOD", "ISFP":"AVERAGE", "ESFP":"AVERAGE", "ISTP":"AVERAGE", "ESTP":"AVERAGE", "ISFJ":"POOR", "ESFJ":"POOR", "ISTJ":"POOR", "ESTJ": "PERFECT"},
#         "ENTP": {"INFP":"GOOD", "ENFP":"GOOD", "INFJ":"PERFECT", "ENFJ":"GOOD", "INTJ":"PERFECT", "ENTJ":"GOOD", "INTP":"GOOD", "ENTP":"GOOD", "ISFP":"AVERAGE", "ESFP":"AVERAGE", "ISTP":"AVERAGE", "ESTP":"AVERAGE", "ISFJ":"POOR", "ESFJ":"POOR", "ISTJ":"POOR", "ESTJ": "POOR"},
#         "ISFP": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"PERFECT", "INTJ":"AVERAGE", "ENTJ":"AVERAGE", "INTP":"AVERAGE", "ENTP":"AVERAGE", "ISFP":"POOR", "ESFP":"POOR", "ISTP":"POOR", "ESTP":"POOR", "ISFJ":"AVERAGE", "ESFJ":"PERFECT", "ISTJ":"AVERAGE", "ESTJ": "PERFECT"},
#         "ESFP": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"AVERAGE", "ENTJ":"AVERAGE", "INTP":"AVERAGE", "ENTP":"AVERAGE", "ISFP":"POOR", "ESFP":"POOR", "ISTP":"POOR", "ESTP":"POOR", "ISFJ":"PERFECT", "ESFJ":"AVERAGE", "ISTJ":"PERFECT", "ESTJ": "AVERAGE"},
#         "ISTP": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"AVERAGE", "ENTJ":"AVERAGE", "INTP":"AVERAGE", "ENTP":"AVERAGE", "ISFP":"POOR", "ESFP":"POOR", "ISTP":"POOR", "ESTP":"POOR", "ISFJ":"AVERAGE", "ESFJ":"PERFECT", "ISTJ":"AVERAGE", "ESTJ": "PERFECT"},
#         "ESTP": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"AVERAGE", "ENTJ":"AVERAGE", "INTP":"AVERAGE", "ENTP":"AVERAGE", "ISFP":"POOR", "ESFP":"POOR", "ISTP":"POOR", "ESTP":"POOR", "ISFJ":"PERFECT", "ESFJ":"AVERAGE", "ISTJ":"PERFECT", "ESTJ": "AVERAGE"},
#         "ISFJ": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"POOR", "ENTJ":"AVERAGE", "INTP":"POOR", "ENTP":"POOR", "ISFP":"AVERAGE", "ESFP":"PERFECT", "ISTP":"AVERAGE", "ESTP":"PERFECT", "ISFJ":"GOOD", "ESFJ":"GOOD", "ISTJ":"GOOD", "ESTJ": "GOOD"},
#         "ESFJ": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"POOR", "ENTJ":"AVERAGE", "INTP":"POOR", "ENTP":"POOR", "ISFP":"PERFECT", "ESFP":"AVERAGE", "ISTP":"PERFECT", "ESTP":"AVERAGE", "ISFJ":"GOOD", "ESFJ":"GOOD", "ISTJ":"GOOD", "ESTJ": "GOOD"},
#         "ISTJ": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"POOR", "ENTJ":"AVERAGE", "INTP":"POOR", "ENTP":"POOR", "ISFP":"AVERAGE", "ESFP":"PERFECT", "ISTP":"AVERAGE", "ESTP":"PERFECT", "ISFJ":"GOOD", "ESFJ":"GOOD", "ISTJ":"GOOD", "ESTJ": "GOOD"},
#         "ESTJ": {"INFP":"BAD", "ENFP":"BAD", "INFJ":"BAD", "ENFJ":"BAD", "INTJ":"POOR", "ENTJ":"AVERAGE", "INTP":"PERFECT", "ENTP":"POOR", "ISFP":"PERFECT", "ESFP":"AVERAGE", "ISTP":"PERFECT", "ESTP":"AVERAGE", "ISFJ":"GOOD", "ESFJ":"GOOD", "ISTJ":"GOOD", "ESTJ": "GOOD"}
#         }

    #########################################
    ###Suggested Changes###
    #########################################

    #user_queries = UserQueries()

    #user1 = user_queries.get_user_by_id(user_id_1)
    #user2 = user_queries.get_user_by_id(user_id_2)

    #if user1 and user2:
        #personality_1 = user1.mbti
        #personality_2 = user2.mbti

        #compatability = compatibility_chart.get(personality_1, {}).get(personality_2, 'UNKNOWN')

        #return compatibility
    #else:
        #return "One or both users not found."

    ##########################################
    ###(COMMENT OUT REST)###
    ##########################################




    # if user_id_1 not in compatibility_chart or user_id_2 not in compatibility_chart:
    #     error_message = "Please enter a valid MBTI type."
    #     return error_message
    # else:
    #     return compatibility_chart[user_id_1][user_id_2]


from db.user_db import UserQueries



def Calculate_Compatibility(user_id_1, user_id_2):
    user_queries = UserQueries()

    user1 = user_queries.get_user_by_id(user_id_1)
    user2 = user_queries.get_user_by_id(user_id_2)

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

    if user1 and user2:
        mbti_1 = user1.mbti
        mbti_2 = user2.mbti

        compatability = compatibility_chart.get(mbti_1, {}).get(mbti_2, 'No MATCH')

        return compatability
    else:
        return "Please enter a valid user ID."

# {
# "poor": 1,
# "bad": 2,
# "average": 3,
# "good": 4,
# "perfect": 5
# }
"""
CREATE OR REPLACE FUNCTION calculate_compatibility(
    user_id_1 integer,
    user_id_2 integer
) RETURNS text AS $$
DECLARE
    mbti_1 text;
    mbti_2 text;
    compatability text;
BEGIN
    SELECT mbti INTO mbti_1 FROM users WHERE id = user_id_1;
    SELECT mbti INTO mbti_2 FROM users WHERE id = user_id_2;

    compatability = compatibility_chart.get(mbti_1, {}).get(mbti_2, 'No MATCH');

    RETURN compatability;
END;
$$ LANGUAGE plpgsql;
"""

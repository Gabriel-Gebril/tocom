export function getMyFirstChatMessages(platform) {
    return [
        {
            "text": "Hi there. This is my first ever chat message",
            "id": "1",
            "sender": {
                "name": "Terry Crews",
                "uid": "terrycrews_" + platform,
                "avatar": "/images/terry.jpg"
            }
        },
    ]
}

export function getCs50Messages(platform) {
    return [
        {
            "text": "Hi there. Welcome to CS50. Please introduce yourselves",
            "id": "1",
            "sender": {
                "name": "CS50 Bot",
                "uid": "cs50bot_" + platform,
                "avatar": "/images/bot.jpg"
            }
        },
        {
            "text": "Hi there. I'm Mark Juniors",
            "id": "2",
            "sender": {
                "name": "Mark J.",
                "uid": "markj_" + platform,
                "avatar": "/images/mark.jpg"
            }
        },
    ]
}

export function getSophiaMessages(platform) {
    return [
        {
            "text": "Hi there. My name's Sophia! What's yours?",
            "id": "1",
            "sender": {
                "name": "Sophia",
                "uid": "sophia_" + platform,
                "avatar": "/images/sophia.jpg"
            }
        },
        {
            "text": "This is an autoresponse",
            "id": "2",
            "sender": {
                "name": "Me",
                "uid": "currentUser",
                "avatar": "https://ui-avatars.com/api/?name=M+E"
            }
        },
        {
            "text": "Oh. You must be busy. Are you available to meet on Decembet 17th, 2020 for a quick face to face meeting?",
            "id": "3",
            "sender": {
                "name": "Sophia",
                "uid": "sophia_" + platform,
                "avatar": "/images/sophia.jpg"
            }
        },
    ]
}
export function getSelectableChatForPlatform(platformName) {
    switch (platformName.toLowerCase()) {
        case "discord": {
            return [
                {
                    chatId: 1,
                    chatName: 'My first discord chat',
                    chatDescription: 'Test channel',
                    avatarUrl: 'https://via.placeholder.com/150',
                    messages: []
                },
                {
                    chatId: 2,
                    chatName: 'CS50',
                    chatDescription: 'Harvard Intro to CS Discord',
                    avatarUrl: 'https://via.placeholder.com/150',
                    messages: []
                },
                {
                    chatId: 3,
                    chatName: 'Sophia',
                    chatDescription: 'Private discord chat with Sophia Mills',
                    avatarUrl: 'https://via.placeholder.com/150',
                    messages: []
                }
            ]
        };
        case "teams": {
            return [
                {
                    chatId: 4,
                    chatName: 'My first teams chat',
                    chatDescription: 'Test channel',
                    avatarUrl: 'https://via.placeholder.com/150',
                    messages: []
                },
                {
                    chatId: 5,
                    chatName: 'CS50',
                    chatDescription: 'Harvard Intro to CS Teams',
                    avatarUrl: 'https://via.placeholder.com/150',
                    messages: []
                },
                {
                    chatId: 6,
                    chatName: 'Sophia',
                    chatDescription: 'Private teams chat with Sophia Mills',
                    avatarUrl: 'https://via.placeholder.com/150',
                    messages: []
                }
            ]
        };
        case "zoom": {
            return [
                {
                    chatId: 7,
                    chatName: 'My first zoom chat',
                    chatDescription: 'Test channel',
                    avatarUrl: 'https://via.placeholder.com/150',
                    messages: []
                },
                {
                    chatId: 8,
                    chatName: 'CS50',
                    chatDescription: 'Harvard Intro to CS Zoom',
                    avatarUrl: 'https://via.placeholder.com/150',
                    messages: []
                },
                {
                    chatId: 9,
                    chatName: 'Sophia',
                    chatDescription: 'Private zoom chat with Sophia Mills',
                    avatarUrl: 'https://via.placeholder.com/150',
                    messages: []
                }
            ]
        };
        default: return null;
    }
}
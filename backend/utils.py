KEYWORDS = ['login', 'signup', 'account', 'payment', 'password', 'signin']

def should_log(url):
    return any(keyword in url.lower() for keyword in KEYWORDS)
Hi! Below are some infos that might be helpful for testing/checking the application.

1. Structure of the application:
-Login page (default): /
-Post list page (protected): /post-list
-Post list page with parameter (protected): /post-list/user_0

**Protected routes can't be access if the user is not logged in. Once logged in, user can access directly to any page within one session. (Token is stored in session storage and is used as authentication key).

2. Features:
-Login page to take in user name and email, requesting a token to fetch data, then redirecting to post list page.
-Post list that shows a list of users on the left side (sorted by name), and current post on the right side. By default it will show all posts.
-When a user name is clicked, parameter got updated, and post list got filtered.
-User name button has active state when it's clicked.
-Url with parameter can be accessed directly (deep link as requested in the requirement). Will returned a filtered post list. For example, /post-list/user_0 will return a post list of only that user.
-Arrow buttons to sort posts by created_time.
-Search input to search for users.
-Search input to search for posts.
-A custom debounce hook is used to take values from inputs only if the user has stopped typing for 0.2s (can be set to another value as well). This could improve performance a bit.

3. What are used in the project?
-React, TS and basic CSS.

That's it! Thank you for your time. And hope to hear from you soon :).

Tuan Doan.

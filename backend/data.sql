DROP DATABASE IF EXISTS "microblog";

CREATE DATABASE "microblog";

\c "microblog"

CREATE TABLE posts (id SERIAL PRIMARY KEY, 
                    title TEXT NOT NULL, 
                    description TEXT NOT NULL,
                    body TEXT, 
                    post_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    votes INT NOT NULL DEFAULT 0);
                    
CREATE TABLE comments (id SERIAL PRIMARY KEY, 
                       text TEXT NOT NULL, 
                       comment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       post_id INT NOT NULL REFERENCES posts ON DELETE CASCADE);

CREATE TABLE poll_title (id serial NOT NULL PRIMARY KEY,
                        title varchar(150) NOT NULL,
                        poll_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);
--do it this way so we can add as many options as we want. Some way to Restrict would be nice
CREATE TABLE poll_choice (id serial NOT NULL PRIMARY KEY,
                            choice_text varchar(200) NOT NULL,
                            votes integer DEFAULT 0,
                            poll_title_id INT NOT NULL REFERENCES poll_title ON DELETE CASCADE);


INSERT INTO posts (title, description, body) VALUES
    ('First Post', 'Best post ever!', 'Everyone loves posting first. I win!'),
    ('Second Post', 'A very good post!', 'Oh well. Didn''t get to be first.');

INSERT INTO comments (text, post_id) VALUES
    ('This is a really great post.', 1),
    ('I learned so much reading this.', 1);


INSERT INTO poll_title (title) VALUES
    ('How do you feel about fall?');

INSERT INTO poll_choice (choice_text, votes, poll_title_id) VALUES
    ('Love it', 3, 1);
INSERT INTO poll_choice (choice_text, votes, poll_title_id) VALUES
    ('Hate it', 1, 1);
INSERT INTO poll_choice (choice_text, votes, poll_title_id) VALUES
    ('Indifferent', 2, 1);


INSERT INTO poll_title (title) VALUES
    ('What is your fav color?');

INSERT INTO poll_choice (choice_text, votes, poll_title_id) VALUES
    ('Red', 2, 1);
INSERT INTO poll_choice (choice_text, votes, poll_title_id) VALUES
    ('Blue', 1, 1);
INSERT INTO poll_choice (choice_text, votes, poll_title_id) VALUES
    ('yellow', 2, 1);
INSERT INTO poll_choice (choice_text, votes, poll_title_id) VALUES
    ('Clear', 2, 1);
USE project;

Create table professor (
Name varchar(255) not null,
Department varchar(255) not null,
Email varchar(255) primary key,
Websitelink varchar(255) not null
);


Create table reviewedby (
Date DATE not null,
UserEmail varchar(255) not null,
CourseReviewID varchar(255) not null,
Primary key (UserEmail, CourseReviewID)
);


create table user_info(
email varchar(255) primary key not null,
major varchar(255),
name varchar(255)
);

create table course(
average_difficulty float not null,
attributes varchar(255),
average_teaching_quality float not null,
course_number varchar(255) not null,
course_name varchar(255) primary key not null,
department varchar(255)
);

create table course_review(
review_id int primary key not null,
semester varchar(255),
professor_email varchar(255) not null REFERENCES professor(Email),
teaching_quality float not null,
difficulty float not null,
comments text,
course_number varchar(255) not null REFERENCES course(course_number)
);

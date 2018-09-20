create table towns (
    id serial not null primary key,
    town_name text not null
);

create table registrations (
    id serial not null primary key,
    reg_number text not null,
    reg_id int,
    foreign key (reg_id) references towns (id)
);

insert into towns (description, town_name) VALUES ('Cape Town', 'CA');
insert into towns (description, town_name) VALUES ('Paarl', 'CL');
insert into towns (description, town_name) VALUES ('Stellenbosch', 'CK');
insert into towns (description, town_name) VALUES ('Goerge', 'CAW');
insert into towns (description, town_name) VALUES ('All', 'All');

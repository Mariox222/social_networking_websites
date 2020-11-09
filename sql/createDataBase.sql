CREATE TABLE socials (
	id serial NOT NULL PRIMARY KEY,
	info json NOT NULL
);

INSERT INTO socials (info)
VALUES('{
        "name": "23snaps",
        "wiki_handle": "23snaps",
        "year_founded": "2012",
        "headquarters": "London, United Kingdom",
        "employees": "20",
        "parent_company": "23snaps",
        "website": "www.23snaps.com",
        "monthly_users": "500000",
        "registration_required": "1",
        "founders": [
            {
                "first_name": "Ivailo",
                "last_name": "Jordanov"
            },
            {
                "first_name": "Yury",
                "last_name": "Tereshchenko"
            }
        ]
    }'),
('{
        "name": "Facebook",
        "wiki_handle": "Facebook",
        "year_founded": "2004",
        "headquarters": "Menlo Park, California",
        "employees": "52000",
        "parent_company": "Facebook, Inc.",
        "website": "www.facebook.com",
        "monthly_users": "2600000000",
        "registration_required": "1",
        "founders": [
            {
                "first_name": "Mark",
                "last_name": "Zuckerberg"
            }
        ]
    }'),
('{
        "name": "Instagram",
        "wiki_handle": "Instagram",
        "year_founded": "2010",
        "headquarters": "Menlo Park, US",
        "employees": "",
        "parent_company": "Facebook, Inc.",
        "website": "www.instagram.com",
        "monthly_users": "1000000000",
        "registration_required": "1",
        "founders": [
            {
                "first_name": "Kevin",
                "last_name": "Systrom"
            },
            {
                "first_name": "Mike",
                "last_name": "Krieger"
            }
        ]
    }'),
('{
        "name": "Discord",
        "wiki_handle": "Discord",
        "year_founded": "2015",
        "headquarters": "San Francisco, US",
        "employees": "592",
        "parent_company": "Discord",
        "website": "www.discord.com",
        "monthly_users": "100000000",
        "registration_required": "1",
        "founders": [
            {
                "first_name": "Jason",
                "last_name": "Citron"
            }
        ]
    }'),
('{
        "name": "Twitter",
        "wiki_handle": "Twitter",
        "year_founded": "2006",
        "headquarters": "San Francisco, US",
        "employees": "4900",
        "parent_company": "Twitter",
        "website": "www.twitter.com",
        "monthly_users": "326000000",
        "registration_required": "1",
        "founders": [
            {
                "first_name": "Jack",
                "last_name": "Dorsey"
            },
            {
                "first_name": "Noah",
                "last_name": "Glass"
            },
            {
                "first_name": "Biz",
                "last_name": "Stone"
            },
            {
                "first_name": "Evan",
                "last_name": "Williams"
            }
        ]
    }'),
('{
        "name": "Reddit",
        "wiki_handle": "Reddit",
        "year_founded": "2005",
        "headquarters": "San Francisco, US",
        "employees": "400",
        "parent_company": "Advance Publications",
        "website": "www.reddit.com",
        "monthly_users": "430000000",
        "registration_required": "0",
        "founders": [
            {
                "first_name": "Steve",
                "last_name": "Huffman"
            },
            {
                "first_name": "Aaron",
                "last_name": "Swartz"
            },
            {
                "first_name": "Alexis",
                "last_name": "Ohanian"
            }
        ]
    }'),
('{
        "name": "Snapchat",
        "wiki_handle": "Snapchat",
        "year_founded": "2011",
        "headquarters": "Santa Monica, US",
        "employees": "3195",
        "parent_company": "Snap",
        "website": "www.snapchat.com",
        "monthly_users": "397000000",
        "registration_required": "1",
        "founders": [
            {
                "first_name": "Reggie",
                "last_name": "Brown"
            },
            {
                "first_name": "Evan",
                "last_name": "Spiegel"
            },
            {
                "first_name": "Bobby",
                "last_name": "Murphy"
            }
        ]
    }'),
('{
        "name": "Pinterest",
        "wiki_handle": "Pinterest",
        "year_founded": "2009",
        "headquarters": "San Francisco, US",
        "employees": "2217",
        "parent_company": "Pinterest",
        "website": "www.pinterest.com",
        "monthly_users": "367000000",
        "registration_required": "1",
        "founders": [
            {
                "first_name": "Ben",
                "last_name": "Silbermann"
            },
            {
                "first_name": "Paul",
                "last_name": "Sciarra"
            },
            {
                "first_name": "Evan",
                "last_name": "Sharp"
            }
        ]
    }'),
('{
        "name": "Tumblr",
        "wiki_handle": "Tumblr",
        "year_founded": "2007",
        "headquarters": "New York, US",
        "employees": "400",
        "parent_company": "Automattic",
        "website": "www.tumblr.com",
        "monthly_users": "23000000",
        "registration_required": "0",
        "founders": [
            {
                "first_name": "David",
                "last_name": "Karp"
            }
        ]
    }'),
('{
        "name": "YouTube",
        "wiki_handle": "YouTube",
        "year_founded": "2005",
        "headquarters": "San Bruno, US",
        "employees": "2000",
        "parent_company": "Google",
        "website": "www.youtube.com",
        "monthly_users": "2000000000",
        "registration_required": "0",
        "founders": [
            {
                "first_name": "Chad",
                "last_name": "Hurley"
            },
            {
                "first_name": "Steve",
                "last_name": "Chen"
            },
            {
                "first_name": "Jawed",
                "last_name": "Karim"
            }
        ]
    }');
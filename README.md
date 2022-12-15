# Soccer Manager FrontEnd

### By: Christopher Yeom

#### Links About Me

[Github Backend](https://github.com/Cyeom97/Fantasy_Soccer) [Trello](https://trello.com/b/eJ1U66G5/fantasy-soccer) [Heroku](https://soccer-manager-client.herokuapp.com/)

## **Overview**

---

I wanted to build a PERN Stack fantasy soccer app that allows users to create an account and build a team. Users earn points after each game week and the top points earners will be displayed on a leaderboard.

---

## **Approach**

After getting my CRUD functionality and routes working on the backend. I needed to successfully call the backend to display on the browser. I also decided to manipulate the data to update points after each game week. One interesting functionality I decided to do was to create an admin page that will allow admins to update points and scores. I was able to successfully build this by setting adding a ternary operator that if a login is authenticated with a specific email, it takes the admin to the admin version of the website. The difference between the admin version and the user version is that the admin can update points and scores.

## **ERD**

![ERD](/images/Screenshot%202022-12-08%20at%209.25.23%20AM.png)

## **CHD**

![CHD](/images/Screenshot%202022-12-07%20at%203.15.16%20PM.png)

---

## **Future Updates**

- To create a leaderboard that displays the best fantasy teams
- Use an external api to increase data from 71 players and 6 teams, to every player and team in the Premier League

### References

[SoccerPitch](https://codepen.io/elliotbirch/pen/OaWYaK?editors=0110)
[Fantasy Premier League](https://fantasy.premierleague.com/)

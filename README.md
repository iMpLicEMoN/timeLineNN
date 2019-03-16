# Task
1) We have 24 hours in a day on Earth.  
2) We have a dataset of N number of users.  
3) Each user in dataset have a unique name\id, playStartTime, playEndTime.  
4) Each user everyday plays in online computer game only one consistent time period.  
5) All users want to play together in groups of 5 players.  

Need: Make a system what takes users dataset and makes groups of 5 users can plays together with maximum effective time.


# Problem
If we try to compare users timelines, it would be looks like this:  
we need to compare EACH playStartTime with EACH AND EACH playEndTime with EACH.  
Wait a second...  Sounds complicated.  
It would be kind of Triangle number and similar with matrix multiplication.  
And complexity of this processing would be O((y-1)*y/2).  
With 10 users its 45 iterations  
With 50 users its 1225 iterations  
With 300 users its 44850 iterations  
With 1000 users its 499500 iterations  
With 5000 users its 1.24975*10^7 iterations  
We just can't do this.

# Solving
The idea came unexpectedly.  
Current realization of neural networks uses algorithms like matrix multiplications.  
So the main idea is convert each timeline into a 1 dimention matrix(vector) and input to Kohonen neural network.  
From output we can get self organized map for fixed number of iterations - now doesn't matter how big is dataset.  
From now we can go through map with some filters and make our groups of 5 players.

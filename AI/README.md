# Carbon Credit Estimation AI
[Jupyter Notebook](https://github.com/lyorrei/bidsquad/blob/master/AI/ai.ipynb)
## Overview

This part of the project utilizes a deep learning model to estimate the number of carbon credits that can be generated from a given property. By analyzing satellite images, the model provides an assessment of the quality of the land and estimated quantity for carbon credit emissions. The trained AI model achieves decent accuracy and can be applied to evaluate different landscapes.
> The model generates a numeric output between 0 to 20, being 0 a piece of land not qualified for any credit emissions and 20 being the best forestry reservation possible.

## Dataset

The dataset consists of 188 satellite images, manually collected and labeled, according to industry standarts [¹](https://www.researchgate.net/profile/Kjell-Klasson/publication/228518044_Estimation_of_carbon_credits_in_carbon_dioxide_sequestration_activities/links/0deec529f44c75d9dd000000/Estimation-of-carbon-credits-in-carbon-dioxide-sequestration-activities.pdf)  for CC emission estimations.

## Model Architecture

The AI model is built using a 10 layer convolutional neural network (CNN) built from the ground up, designed to process the satellite images and output a numeric value representing the estimated carbon credits.

# Examples
![image](https://raw.githubusercontent.com/lyorrei/bidsquad/master/AI/imgs/121.png)
Expected: **15** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Actual output: **14.22**

![image](https://raw.githubusercontent.com/lyorrei/bidsquad/master/AI/imgs/128.png)
Expected: **18** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Actual output: **17.58**

![image](https://raw.githubusercontent.com/lyorrei/bidsquad/master/AI/imgs/151.png)
Expected: **4** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Actual output: **5.10**

![image](https://raw.githubusercontent.com/lyorrei/bidsquad/master/AI/imgs/164.png)
Expected: **11** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Actual output: **11.13**

![image](https://raw.githubusercontent.com/lyorrei/bidsquad/master/AI/imgs/66.png)
Expected: **0** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Actual output: **0.34**

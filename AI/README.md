# Carbon Credit Estimation AI

## Overview

This part of the project utilizes a deep learning model to estimate the number of carbon credits that can be generated from a given property. By analyzing satellite images, the model provides an assessment of the quality of the land and estimated quantity for carbon credit emissions. The trained AI model achieves good accuracy and can be applied to evaluate different landscapes.
> The model generates a numeric output between 0 to 20, being 0 a piece of land not qualified for any credit emissions and 20 being the best forestry reservation possible.

## Dataset

The dataset consists of 188 satellite images, manually collected and labeled, according to industry standarts for CC emission estimations.

## Model Architecture

The AI model is built using a 10 layer convolutional neural network (CNN) built from the ground up, designed to process the satellite images and output a numeric value representing the estimated carbon credits.

# Examples
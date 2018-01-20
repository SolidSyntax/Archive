# Data Preprocessing

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Data.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values


#Take care of the missing data
#from sklearn.preprocessing import Imputer

#imputer = Imputer(missing_values = 'NaN', strategy = 'mean', axis = 0)
#imputer = imputer.fit(X[:,1:3])
#X[:,1:3] = imputer.transform(X[:,1:3])

# Encoding categorical data
#from sklearn.preprocessing import LabelEncoder, OneHotEncoder

#Change the coutries to values
#labelencoder_X = LabelEncoder()
#X[:, 0] = labelencoder_X.fit_transform(X[:, 0])

#Split the values into differen columns with 0 and 1 values
#onehotencoder = OneHotEncoder(categorical_features = [0])
#X = onehotencoder.fit_transform(X).toarray()

#Change true and false from purchased to 0 and 1
#labelencoder_y = LabelEncoder()
#y = labelencoder_y.fit_transform(y)


# Splitting the dataset into the Training set and Test set
from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X,y, test_size = 0.2,random_state = 0)

↑# Feature Scaling (values must be in the same range)
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)
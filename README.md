# PowerApp - basic application for electricity trading. 
## Frontend:
### https://softuni-react-powerapp.herokuapp.com/
### or
### https://softuni-react-powerapp.vercel.app/
## Backend:
### https://backend-react-powerapp.herokuapp.com/docs

## Preloaded initial administrator account: 
### username : admin@aol.com
### password : 12345
# Notes
## 1.Authorization and authentication
### Only administrators can create and redact users.
### Registered users can create and redact contracts.
### Unregistered user may enter as Guest and will be able to see only home page with spot markets data.
## 2. Contract creation
### There are four steps in contract creation:
### - choosing or creating new counterparty - 'Company name' and 'Company EIK' fields serves as searching fields while is typing. If existing company is selected its data will be loaded.  
### - contract details - duration and price of the contract. NB - Because heroku's free postgresql service limitation of 10 000 rows and the fact that each contract creates hourly schedule for the whole priod, contract duration must be less than a month. Interesting fact - in similar working implementation based on Flask and MySQL, schedule table quickly reach approx 300 000 000 records.
The price is in Bulgarian Lev for kWh energy nad must be between 0.01 and 2.00.
### - ITN data - here the ITN data is provided. ITN can be considered as electricity meter device which will gather data for electriity consumption for period. Its address may be diiferent from companies one. Every grid operator has it's own STP hourly coefficients which are used to distribute forecasted monthly consumption for every hour. Because summary of all operators coefficients for a year is around 230 000 records, excel file is used on the backend to serve selected data. This is the reason for slower loading. Theara are three barcharts, first one represents hourly coeefs for whole period of the contract, second one is aggregation of every particular hour od the day for workdays only and the last one is the same but for the weekends.
### - confirm - check and confirm provided data.
## 3. Contract redacting - contract must be selected from the table and then can be redacted or deleted.
## 4. There is an option to toggle theme between dark and light.
## 5. This project is far away from point than can be usefull. Here some basic todos tha must be acheved:
### - uploading realy reported data from grid operators for each ITN (there is such a column in schedule table already)
### - observing errors between forecasted hourly consumption and real reported volumsa and creates varied prediction models (like ARIMA, Linear Reggression based on forecasted temperatures)
### - calculating hourly forecasted position for every hour for agregated volumes and makes finance results prediction and analysis.
The warnings 'Can't perform a React state update on an unmounted component. This is...' are react-hook-form related : https://github.com/react-hook-form/react-hook-form/discussions/3643



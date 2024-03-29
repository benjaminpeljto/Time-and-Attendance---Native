*Project proposal* (for Advanced Mobile Programming Course): 
  - This React Native mobile application is going to be used as a part of my Senior Design Project.
  - The application's main functionality is the ability for permitted users to scan a QR code and in that way enable tracking of their work time.
  - Permitted users are ONLY ones who are going to be able to access the application utilizing an access token. Without a valid access token, one cannot access the mobile application.
  - The QR code is going to be generated by a web application and it will hold the attendance data. After the user scans the code and selects one of two options (Clock-in/Clock-out), a request to the server is going to be sent and the mobile app should recieve a response.
  -  After the response is recieved, it should be displayed to the user (error) or the application logic will enable user to access the application.
  - Besides that, the manual attendance request feature is also going to be available. That feature allows a user to manually enter his start/end of working time (if user wasn't able to scan the QR code) and submit it, but it will be sent to supervisor for approval (happening on the web app) and the user will be notified about the result of the approval utilizing push notifications.

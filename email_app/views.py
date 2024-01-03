from django.shortcuts import render
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.http import HttpResponse
from email_send_project.settings import *
from django.template.loader import render_to_string
from bs4 import BeautifulSoup

# Create your views here.
def send_my_email(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        phone = request.POST.get('phone')
        date = request.POST.get('date')
        appointment_time = request.POST.get('appointment_time')
        html_string = date
        soup = BeautifulSoup(html_string, 'html.parser')
        month = soup.find('span', class_='any').previous_sibling.strip()  # Extracts "December"
        year = soup.find('span', class_='any').text.strip()  # Extracts "2023"
        appointment_date = f"{month} {year}"
        email_template = render_to_string('email_template.html',
                                        {'appointment_time':appointment_time,
                                        'name': name,
                                        'email': email,
                                        'message': message,
                                        'phone': phone, 
                                        'date':appointment_date}
                                        )

        message = MIMEMultipart()
        message["From"] = SENDER_EMAIL
        message["To"] = email
        message["Subject"] = "BOOKING FOR APPOINTMENT"
        message.attach(MIMEText(email_template, "html"))

        try:
            with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
                server.starttls()
                server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
                print(email)

                server.sendmail(SENDER_EMAIL, [email, SENDER_EMAIL], message.as_string())

            print("Email sent successfully!")
            return HttpResponse("OK")
        except Exception as e:
            print(f"Error sending email: {e}")
            return HttpResponse("Error sending email.")
    context = {'some_key': 'some_value'}  # Add context data here
    return render(request, 'index.html', context)
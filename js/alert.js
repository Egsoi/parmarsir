/*

 const hideClasses = ['box', 'review_btn'];

 hideClasses.forEach(className => {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
       elements[i].style.display = 'none';
    }
 });

*/

 // Load SweetAlert2 dynamically
 const script = document.createElement('script');
 script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
 script.onload = function() {
    // Function to show the alert
    function showAlert() {
       Swal.fire({
          html: `
                <h2>Official telegram channel <br><a href="https://telegram.me/parmarsirquiz" target="_blank">@ParmarSirQuiz</a></h2> <br> Agar age bhi aise hi update chahte ho to official channel join kr lo.<!-- Clickable title with link -->
            `,

          icon: 'info',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Join',

          allowOutsideClick: false, // Prevent closing when clicking outside
          customClass: {
             container: 'my-swal-container',
             title: 'my-swal-title',
             content: 'my-swal-content',
             cancelButton: 'my-swal-cancel-button',
             confirmButton: 'my-swal-confirm-button'
          }
       }).then((result) => {
          if (result.isConfirmed) {
             // Redirect to the join link
             window.location.href = 'https://telegram.me/ParmarSirQuiz'; // Replace with your link
          }
          // If cancelled, do nothing (the alert will close automatically)
       });
    }

    // Show alert on page load
    window.onload = showAlert;

    // Adding custom styles
    const style = document.createElement('style');
    style.textContent = `
        .my-swal-container {
            background-color: #f0f0f0;
        }
        a {
            color: #007bff;
        }
       .dark-mode .my-swal-content {
            color: #333;
        }
       .dark-mode .my-swal-confirm-button {
            background-color: #007bff;
            color: #fff;
                        box-shadow:none;

        }
        .dark-mode .my-swal-confirm-button:hover {
            background-color: #0056b3;
        }
       .dark-mode .my-swal-cancel-button {
            background-color: #ccc;
            color: #000;
            box-shadow:none;
        }
       .dark-mode .my-swal-cancel-button:hover {
            background-color: #aaa;
        }
    `;
    document.head.appendChild(style);
 };
 document.head.appendChild(script);
 
 
 
 
 
 
 
 
 
 /*

function getPassword() {
            const password = "❣️"; // Replace with your actual password
            const input = prompt("Please enter the password to access the content:");
            if (input === password) {
            } else if (input === "king") {
                alert("pliiiiii");
                getPassword(); // Redirect back to the password entry section
            } else if (input === null) {
                window.close(); // Close the tab if the user clicks "Cancel" or presses "Esc"
            } else {
                alert("Incorrect password. Click OK to try again.");
                getPassword(); // Redirect back to the password entry section
            }
        }
        function showContent(content) {
            document.body.innerHTML = content;
        }
        getPassword(); // Start the password entry process
        
        
        */

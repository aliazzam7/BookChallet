document.addEventListener("DOMContentLoaded", function() {
    const containers = document.querySelectorAll(".container");
    let currentIndex = 0;

    function showContainer(index) {
        containers.forEach((container, i) => {
            container.classList.toggle("active", i === index);
        });
    }

    document.querySelectorAll(".next-button").forEach(button => {
        button.addEventListener("click", function() {
            if (currentIndex < containers.length - 1) {
                currentIndex++;
                showContainer(currentIndex);
            }
        });
    });

    document.querySelector(".save-button").addEventListener("click", function() {
        alert("Form saved!");
        // Optionally reset the form or handle form submission here
    });

    showContainer(currentIndex);
});
//pour l'image:
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".file-input").forEach(input => {
        input.addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                const imgId = `image-${event.target.id.split('-')[2]}`;
                reader.onload = function(e) {
                    const imgElement = document.getElementById(imgId);
                    imgElement.src = e.target.result;
                    imgElement.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    });
});

//pour equipemnet:
document.addEventListener("DOMContentLoaded", function() {
    const equipmentItems = document.querySelectorAll('.equipment-item');
  
    equipmentItems.forEach(item => {
      const iconText = item.querySelector('.equipment-icon').textContent.trim().toLowerCase();
      const checkbox = item.querySelector('.equipment-checkbox');
  
      if (iconText === 'ac') {
        checkbox.checked = true;
      }
    });
  });
  
/*document.addEventListener("DOMContentLoaded", function() {
    const equipmentItems = document.querySelectorAll('.equipment-item');
  
    equipmentItems.forEach(item => {
      const iconText = item.querySelector('.equipment-icon').textContent.trim();
      const checkbox = item.querySelector('.equipment-checkbox');
  
      if (iconText.toLowerCase() === 'ac') {
        checkbox.checked = true;
      }
    });
  });*/
  
  //for room:
  document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('.room-checkbox');
  
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const input = this.closest('.room-field').querySelector('.room-input');
        if (this.checked) {
          input.style.display = 'block';
        } else {
          input.style.display = 'none';
        }
      });
    });
  });
  








/*// Add event listener to the "Next" button
const nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', () => {
  // Toggle the visibility of the "Rooms" container
  const roomsContainer = document.querySelector('.container:last-of-type');
  roomsContainer.classList.toggle('hidden');
});

// Add event listener to the "Save" button
const saveButton = document.querySelector('.save-button');
saveButton.addEventListener('click', () => {
  // Get the values from the room input fields
  const bedroomInput = document.getElementById('bedroom');
  const bathroomInput = document.getElementById('bathroom');
  const salonInput = document.getElementById('salon');
  const bedroom2Input = document.getElementById('bedroom-2');

  // Save the values to local storage or send them to the server
  localStorage.setItem('bedroom', bedroomInput.value);
  localStorage.setItem('bathroom', bathroomInput.value);
  localStorage.setItem('salon', salonInput.value);
  localStorage.setItem('bedroom2', bedroom2Input.value);

  // Display a success message or perform any other necessary actions
  alert('Room details saved successfully!');
});*/
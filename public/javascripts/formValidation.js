document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');
    const accountType = document.getElementById('accountType');
    const storeOwnerFields = document.querySelector('.store-owner-fields');
  
    // Show or hide store owner fields based on account type
    accountType.addEventListener('change', function () {
      if (accountType.value === 'store owner') {
        storeOwnerFields.style.display = 'block';
      } else {
        storeOwnerFields.style.display = 'none';
      }
    });
  
    form.addEventListener('submit', function (event) {
      let valid = true;
  
      // Validate Email
      const email = form.elements['mail'];
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email.value)) {
        email.classList.add('is-invalid');
        valid = false;
      } else {
        email.classList.remove('is-invalid');
      }
  
      // Validate Phone
      const phone = form.elements['phone'];
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(phone.value)) {
        phone.classList.add('is-invalid');
        valid = false;
      } else {
        phone.classList.remove('is-invalid');
      }
  
      // Validate Password
      const password = form.elements['password'];
      if (password.value.length < 8) {
        password.classList.add('is-invalid');
        valid = false;
      } else {
        password.classList.remove('is-invalid');
      }
  
      // Validate First Name
      const firstName = form.elements['first_name'];
      const namePattern = /^[A-Za-z]+$/;
      if (!namePattern.test(firstName.value)) {
        firstName.classList.add('is-invalid');
        valid = false;
      } else {
        firstName.classList.remove('is-invalid');
      }
  
      // Validate Last Name
      const lastName = form.elements['last_name'];
      if (!namePattern.test(lastName.value)) {
        lastName.classList.add('is-invalid');
        valid = false;
      } else {
        lastName.classList.remove('is-invalid');
      }
  
      // Validate Address
      const address = form.elements['address'];
      if (address.value.trim().length === 0) {
        address.classList.add('is-invalid');
        valid = false;
      } else {
        address.classList.remove('is-invalid');
      }
  
      // Validate City
      const city = form.elements['city'];
      if (!namePattern.test(city.value)) {
        city.classList.add('is-invalid');
        valid = false;
      } else {
        city.classList.remove('is-invalid');
      }
  
      // Validate Zipcode
      const zip = form.elements['zip'];
      if (zip.value.trim().length === 0) {
        zip.classList.add('is-invalid');
        valid = false;
      } else {
        zip.classList.remove('is-invalid');
      }
  
      // Validate Country
      const country = form.elements['country'];
      if (country.value === '') {
        country.classList.add('is-invalid');
        valid = false;
      } else {
        country.classList.remove('is-invalid');
      }
  
      // Validate Account Type
      const accountTypeValue = accountType.value;
      if (accountTypeValue === '') {
        accountType.classList.add('is-invalid');
        valid = false;
      } else {
        accountType.classList.remove('is-invalid');
      }
  
      if (accountTypeValue === 'store owner') {
        // Validate Business Name
        const businessName = form.elements['business_name'];
        if (businessName.value.trim().length === 0) {
          businessName.classList.add('is-invalid');
          valid = false;
        } else {
          businessName.classList.remove('is-invalid');
        }
  
        // Validate Store Name
        const storeName = form.elements['store_name'];
        if (storeName.value.trim().length === 0) {
          storeName.classList.add('is-invalid');
          valid = false;
        } else {
          storeName.classList.remove('is-invalid');
        }
  
        // Validate Store Category
        const storeCategory = form.elements['store_category'];
        if (storeCategory.value === '') {
          storeCategory.classList.add('is-invalid');
          valid = false;
        } else {
          storeCategory.classList.remove('is-invalid');
        }
  
        // Validate Store Logo
        const storeLogo = form.elements['store_logo'];
        if (storeLogo.files.length === 0) {
          storeLogo.classList.add('is-invalid');
          valid = false;
        } else {
          storeLogo.classList.remove('is-invalid');
        }
      }
  
      // Prevent form submission if validation fails
      if (!valid) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, false);
  });
  
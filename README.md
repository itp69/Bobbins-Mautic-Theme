# Bobbins-Mautic-Theme
This theme uses a bit of a hack to create a landing page that uses a 2-step sign up process.

Rather than the sign up form being displayed in the landing page, it's presented in a modal when one of the two buttons is clicked. Apparently this micro-commitment of the first click leads to higher conversions.

To achieve this, there are several text slots for editing the modal content that are hidden when the theme is loaded in Froala. The fields are displayed when the user mouses over the container for the main button.

When viewed on the front end, these slots form the main content of the modal pop-up.

While it's a bit of a hacky approach, I don't think it's too ugly to make public and certainly more straight forward than adding a new slot type. However, I'd be interested to hear other opinions on the approach.

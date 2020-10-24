const footerCon = (() => {
  const footer = document.querySelector('#footer');
  const footerItem = document.createElement('div');
  footerItem.classList = 'bg-dark text-center text-white py-4';
  footerItem.innerHTML = `
                        &copy; 2020 <strong>Jamezjaz || JavaScript Calculator</strong>
                        `;
  footer.appendChild(footerItem);
})();

export default footerCon;
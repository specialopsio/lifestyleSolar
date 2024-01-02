 // Function to create a skeleton element
 function createSkeletonElement(id, className) {
    const skeleton = document.createElement('div');
    skeleton.id = id;
    skeleton.className = `skeleton ${className}`;
    return skeleton;
  }

  // Function to simulate data fetching
  function fetchData(id, value, delay = 2000) {
    return new Promise(resolve => {
      setTimeout(() => {
        document.getElementById(id).textContent = value;
        const skeletonId = `skeleton-${id}`;
        document.getElementById(skeletonId).remove();
        resolve();
      }, delay);
    });
  }

  // Insert skeletons for each stat
  const statContainers = ['sunlightHours', 'kwHours', 'savingsDollars'];
  statContainers.forEach(id => {
    const container = document.getElementById(id);
    const skeleton = createSkeletonElement(`skeleton-${id}`, 'skeleton-rectangle');
    container.parentElement.insertBefore(skeleton, container);
  });

  // Fetch the data and replace the skeletons
  Promise.all([
    fetchData('sunlightHours', '2,187'),
    fetchData('kwHours', '4kw'),
    fetchData('savingsDollars', '$8,000')
  ]).then(() => {
    // All skeletons have been replaced with real data
  });
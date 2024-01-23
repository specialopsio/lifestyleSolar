(function() {
    // Backup original methods
    const originalAppendChild = Node.prototype.appendChild;
    const originalInsertBefore = Node.prototype.insertBefore;

    // Function to check if the node has specific classes
    function hasTargetClasses(node) {
        return node.classList && node.classList.contains('tawk-flex') &&
               node.classList.contains('tawk-flex-center') &&
               node.classList.contains('tawk-text-center') &&
               node.classList.contains('tawk-padding-small');
    }

    // Override appendChild
    Node.prototype.appendChild = function(node) {
        if (!hasTargetClasses(node)) {
            return originalAppendChild.call(this, node);
        }
    };

    // Override insertBefore
    Node.prototype.insertBefore = function(newNode, referenceNode) {
        if (!hasTargetClasses(newNode)) {
            return originalInsertBefore.call(this, newNode, referenceNode);
        }
    };

    // CSS to hide the elements, as a fallback
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .tawk-flex.tawk-flex-center.tawk-text-center.tawk-padding-small {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
})();
var user = 'visitor@';
let typedChars = 0;

document.addEventListener('DOMContentLoaded', function() {
    fetchIPAddress();

    const term = new Terminal({
        theme: {
            background: '#02020b',
            foreground: '#f8f8ff',
            cursor: '#f8f8ff',
            selection: 'rgba(0, 0, 255, 0.3)'
        },
        cols: 100,
        rows: 40
    });

    const termContainer = document.getElementById('terminal-container');

    term.open(termContainer);

    setTimeout(function() {
        term.write(user);
    }, 750);

    term.onKey(e => {
        const ev = e.domEvent;
        const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

        if (ev.keyCode === 13) {
            term.writeln('');
            term.write(user);
            typedChars = 0;
        } else if (ev.keyCode === 8) {
            if(typedChars > 0) {
                term.write('\b \b');
                typedChars--;
            }
        } else if (ev.keyCode === 37 || ev.keyCode === 39) {
            ev.preventDefault();
        } else if (ev.keyCode === 38 || ev.keyCode === 40) {
            ev.preventDefault();
        } else if (printable) {
            term.write(e.key);
            typedChars++;
        }
    });
    
    term.focus();
});

async function fetchIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        user = user + data.ip + ' ~ % ';
    } catch (error) {
        user = user + 'default ~ % ';
    }
}

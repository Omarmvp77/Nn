fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        fetch(`http://ip-api.com/json/${data.ip}`)
            .then(res => res.json())
            .then(location => {
                fetch('https://your-backend-url.com/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ip: data.ip,
                        country: location.country,
                        city: location.city,
                        region: location.regionName,
                        isp: location.isp,
                        userAgent: navigator.userAgent,
                        referrer: document.referrer
                    })
                });
            });
    });
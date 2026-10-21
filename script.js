function switchTab(tabId) {
    // 버튼 초기화
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    // 섹션 초기화
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));

    // 선택된 탭 활성화
    if(tabId === 'qr') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('qr-section').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('shorten-section').classList.add('active');
    }
}

function generateQR() {
    const input = document.getElementById('qr-input').value;
    const img = document.getElementById('qr-image');
    const placeholder = document.querySelector('#qr-result .placeholder-text');
    
    if (input.trim() === '') {
        alert('QR코드로 변환할 웹사이트 주소를 입력해주세요.');
        return;
    }
    
    // 무료 QR 생성 API 사용
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(input)}`;
    img.src = qrUrl;
    
    img.onload = () => {
        img.style.display = 'block';
        placeholder.style.display = 'none';
    };
}

async function shortenURL() {
    const input = document.getElementById('shorten-input').value;
    const resultBox = document.getElementById('shorten-result');
    
    if (input.trim() === '') {
        alert('단축할 긴 URL을 입력해주세요.');
        return;
    }

    resultBox.innerHTML = '<p style="color:#666;">URL을 단축하는 중입니다...</p>';

    try {
        // is.gd 무료 URL 단축 API 사용
        const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(input)}`);
        const data = await response.json();
        
        if(data.shorturl) {
            resultBox.innerHTML = `
                <p style="color:#333; margin-bottom:10px; font-size:14px;">생성된 단축 URL:</p>
                <a href="${data.shorturl}" target="_blank" class="short-url-link">${data.shorturl}</a>
            `;
        } else {
            resultBox.innerHTML = '<p style="color:#d93025;">오류: 유효한 URL 형식이 아닙니다.</p>';
        }
    } catch (error) {
        resultBox.innerHTML = '<p style="color:#d93025;">네트워크 오류: 단축 서비스에 연결할 수 없습니다.</p>';
    }
}
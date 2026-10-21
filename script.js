let qrcode = null;

function generateQR() {
    const url = document.getElementById('url-input').value;
    if (!url.trim()) {
        alert('URL을 입력해주세요.');
        return;
    }

    const qrContainer = document.getElementById('qrcode');
    const qrSection = document.getElementById('qr-section');

    // 이전 QR코드 초기화
    qrContainer.innerHTML = '';

    // QR코드 생성 (qrcode.js 라이브러리 사용)
    qrcode = new QRCode(qrContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // 3번 조건: URL 확인 누르면 QR코드가 정중앙에 생기고, 
    // 입력창은 그 밑으로 자연스럽게 밀려 내려가게 UI 전환
    qrSection.style.display = 'flex';
    
    // 부드러운 애니메이션 전환을 위한 딜레이
    setTimeout(() => {
        qrSection.classList.add('show');
        qrSection.style.opacity = 1;
    }, 50);

    // 4번 조건: QR코드 클릭 시 JPG 파일로 다운로드
    qrContainer.onclick = function() {
        const canvas = qrContainer.querySelector('canvas');
        if (canvas) {
            // 흰색 배경을 보장하기 위해 새 캔버스에 병합 (투명 방지)
            const newCanvas = document.createElement('canvas');
            newCanvas.width = canvas.width;
            newCanvas.height = canvas.height;
            const ctx = newCanvas.getContext('2d');
            
            ctx.fillStyle = '#ffffff'; // 하얀색 배경
            ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
            ctx.drawImage(canvas, 0, 0);

            // 캔버스를 JPG 이미지 데이터로 변환 (품질 1.0)
            const imgData = newCanvas.toDataURL("image/jpeg", 1.0);
            
            // a 태그를 이용해 강제 다운로드 실행
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'qrcode_download.jpg'; // 파일명 지정
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
}

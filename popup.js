document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("toggleSwitch");
  
    // 초기 스위치 상태를 스토리지에서 가져옴
    chrome.storage.local.get(["extensionEnabled"], function (result) {
      toggleSwitch.checked = result.extensionEnabled || false;
    });
  
    // 스위치가 변경될 때 상태를 저장하고 background.js에 상태 전송
    toggleSwitch.addEventListener("change", function () {
      const isEnabled = this.checked;
      chrome.storage.local.set({ extensionEnabled: isEnabled }, function () {
        console.log("Extension enabled:", isEnabled);
      });
  
      // background.js에 상태 전송
      chrome.runtime.sendMessage({ action: "toggleExtension", isEnabled: isEnabled });
    });
  });
  
import cv2
import pyautogui

def scroll_control(event, x, y, flags, param):
    global frame_index

    if event == cv2.EVENT_MOUSEWHEEL:
        if flags > 0:
            frame_index += 1
        else:
            frame_index -= 1
        frame_index = max(0, min(frame_index, total_frames - 1))

cap = cv2.VideoCapture("video.mp4")  # Change "video.mp4" to your video file path
frame_index = 0
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

cv2.namedWindow("Video")
cv2.setMouseCallback("Video", scroll_control)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    cv2.imshow("Video", frame)
    cv2.waitKey(25)

    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_index)
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

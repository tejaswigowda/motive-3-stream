from scipy.spatial.transform import Rotation as R

quat_arr = [-0.14, -0.03, -0.01, -0.99]
r=R.from_quat(quat_arr)
print(r.as_euler('zyx',degrees=True))

quat_arr = [-0.05, -0.01, 0.00, -1.00]
r=R.from_quat(quat_arr)
print(r.as_euler('zyx',degrees=True))

##Kubernetes Dashboard
This doc will help you to install kubernetes dashboard. This will not be a complete guide but rather an initial setup to get the dashboard running.
#Step 1: Install k8s dashboard
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml
```
You can access this dashboard through ```kubectl proxy```. However this is not the case if you are runnning kubernetes on a machine remotely. So to gain access to the dashboard instead you can do the following:
#Step 2 Find the dashboard service
Look for the dashboard service.
```
kubectl get services -n kubernetes-dashboard
```
You will see one service called ```kubernetes-dashboard```. If you don't then try adding `--all-namespaces` instead of `-n kubernetes-dashboard` at the end. It will also show you what the namespace of `kubernetes-dashboard` is.
Edit this service by using:
```
kubectl edit service kubernetes-dashboard -n kubernetes-dashboard
```
Go to the line where you see `Type: ClusterIp` and change it to `Type: NodePort`.
Using:
```
    kubectl get services -n kubernetes-dashboard
```
Should show something like:
```
kubernetes-dashboard        NodePort    10.104.236.135   <none>        443:31010/TCP   6m
```
You should be able to visit `https://{MASTER_IP}:{PORT}` with `PORT=31010`.
You should be able to see a login screen.
To login we need a token which is created after we create a user-account.
To create an admin account you can use the `create-admin.yaml` file in this repo.
```
kubectl apply -f create-admin.yaml
```
Find the `admin-user-token` using:
```
kubectl get secrets -n kubernetes-dashboard
```
Show the token on screen using:
```
kubectl describe secret admin-user-token-{id} -n kubernetes-dashboard
```
Copy the content of the `Token:` attribute and paste it to login.


##Next step
Install Ingress
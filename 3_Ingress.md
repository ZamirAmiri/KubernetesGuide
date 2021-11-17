##NGINX Ingress
NGINX is installed using the Bera metal cluster setup.
install nginx ingress
#Step 1
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.5/deploy/static/provider/baremetal/deploy.yaml
```
#Step 2
Check if the installation was successful
```
POD_NAMESPACE=ingress-nginx
POD_NAME=$(kubectl get pods -n $POD_NAMESPACE -l app.kubernetes.io/name=ingress-nginx --field-selector=status.phase=Running -o name)
kubectl exec $POD_NAME -n $POD_NAMESPACE -- /nginx-ingress-controller --version
```
You should see something like 
```
-------------------------------------------------------------------------------
NGINX Ingress controller
  Release:       v1.0.5
  Build:         7ce96cbcf668f94a0d1ee0a674e96002948bff6f
  Repository:    https://github.com/kubernetes/ingress-nginx
  nginx version: nginx/1.19.9

-------------------------------------------------------------------------------
```
#Step 3
Make nginx accessable from the outside by giving it an external IP, using the provided ingress_loadbalancer.
Add one (or multiple) worker ip(s) as external ip
```
externalIPs:
    - 192.168.2.94
```
Apply the file
```
kubectl apply -f ingress_loadbalancer.yaml
```
#Step 4 Test
This is only to test the configurations. You can delete these pods through the dashboard afterwards.
```
kubectl create deployment --image nginx my-nginx
```
wait until the pod is running
```
kubectl get pods
```
Deploy a service for the pod using test_service.yaml and verify it's existence
```
kubectl get services
```
Now we need an ingress rule that will redirect incoming http request to this service.
To create it, you can use test_ingress.yaml
```
kubectl apply -f test_ingress.yaml
```
Check ingress, and see if the ip address that was added as external ip is added ass ADDRESS for the nginx config.
```
kubectl get ing
```
```
NAME                 CLASS   HOSTS   ADDRESS        PORTS   AGE
ingress-webhosting   nginx   *       192.168.2.94   80      24s
```
Visit the page and see if it worked. You should see a `Welcome to nginx!` message.
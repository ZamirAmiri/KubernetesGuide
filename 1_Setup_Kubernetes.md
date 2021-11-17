##Kubernetes installation (Master node/ Worker node)
This file will help you to install kubernetes on Ubuntu LTS 20.04 LTS

##Prerequisite
#Update your system
```
sudo apt-get update
```
```
sudo apt-get upgrade
```
#Disable swap
```
sudo swapoff -a
sudo rm /swap.img
```
Remove following line from /etc/fstab
```
/swap.img       none    swap    sw      0       0
```


##Step 1
#Letting iptables see bridged traffic
Make sure that the br_netfilter module is loaded. This can be done by running lsmod | grep br_netfilter. To load it explicitly call 
```
sudo modprobe br_netfilter
```
```
    cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
    br_netfilter
    EOF
```
```
    cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
    net.bridge.bridge-nf-call-ip6tables = 1
    net.bridge.bridge-nf-call-iptables = 1
    EOF
```
```
sudo sysctl --system
```

##Step 2 
#Open up all ports needed (Master only)
```
    ufw allow 6443
    ufw allow 2379:2380
    ufw allow 10250
    ufw allow 10259
    ufw allow 10257
```
#Set up all ports needed (Worker only)
```
ufw allow 10250
ufw allow 30000:32767/tcp
```
##Step 3 Install Docker
Uninstall old versions of docker
```
sudo apt-get remove docker docker-engine docker.io containerd runc
```
```
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
```
Add docker GPG key
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
Set up repository
```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
Install docker engine
```
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io
```
Now Docker is running, but for kubernetes you still need to change cgroupdriver. To do so add the following line in ```/etc/docker/daemon.json```
```
{
    "exec-opts": ["native.cgroupdriver=systemd"]
}
```
Restart docker
```
sudo systemctl restart docker
```
Test your Docker installation
```
sudo docker run hello-world | grep "Hello from Docker!"
```

##Step 4 Install Kubeadm, kubectl, kubelet
1. Update the apt package index and install packages needed to use the Kubernetes apt repository:
```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
```
2. Download the Google Cloud public signing key:
```
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
```
3. Add the Kubernetes apt repository:
```
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
```
4. Update apt package index, install kubelet, kubeadm and kubectl, and pin their version:
```
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```
Worker nodes do not have to follow any of the latter instructions.
To Join a cluster with a worker node use the ```kubeadm join```.
Use the following command on a master node to create a token and print the join command:
```kubeadm token create --print-join-command```
### Master  only
#Kubernetes tools are now succesfully installed.
##Step 5 create a cluster
Replace MASTERNODE_IP with your IP address
[Note:] The podnetwork added is for Calico
```
kubeadm init --apiserver-advertise-address=MASTERNODE_IP --control-plane-endpoint=MASTERNODE_IP --pod-network-cidr=192.168.0.0/16
```
Make sure to export KUBECONFIG.
```
export KUBECONFIG=/etc/kubernetes/admin.conf
```
Add the export also in /etc/profile so it can be loaded in case your machine restarts.
```
source /etc/bash.bashrc
```

##Step 6 install calico
1. Execute the following commands to configure kubectl (also returned by kubeadm init)
```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
2. Install the Tigera Calico operator and custom resource definitions.
```
kubectl create -f https://docs.projectcalico.org/manifests/tigera-operator.yaml
```
3. Install Calico by creating the necessary custom resource. For more information on configuration options available in this manifest, see the installation reference.
```
kubectl create -f https://docs.projectcalico.org/manifests/custom-resources.yaml
```
4. Confirm that all of the pods are running with the following command.
```
watch kubectl get pods -n calico-system
```
Wait until each pod has the STATUS of Running
5. Remove the taints on the master so that you can schedule pods on it.
```
kubectl taint nodes --all node-role.kubernetes.io/master-
```
6. Confirm that you now have a node in your cluster with the following command.
```
kubectl get nodes -o wide
```

##Next Step
Install kubernetes dashboard